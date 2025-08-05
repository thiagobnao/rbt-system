from flask import Blueprint, jsonify, session
from src.models.concurso import Concurso
from src.models.escola import Escola, Sala
from src.models.colaborador import Colaborador
from src.models.financeiro import Pagamento
from src.models.calendario import EventoCalendario
from sqlalchemy import func, and_
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard', __name__)

def require_auth():
    """Decorator para verificar autenticação"""
    if not session.get('logged_in'):
        return jsonify({'error': 'Usuário não autenticado'}), 401
    return None

@dashboard_bp.route('/dashboard/kpis', methods=['GET'])
def get_kpis():
    """Obter KPIs principais do dashboard"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        # Total de concursos
        total_concursos = Concurso.query.count()
        concursos_ativos = Concurso.query.filter_by(status='ativo').count()
        
        # Total de escolas
        total_escolas = Escola.query.count()
        
        # Total de salas
        total_salas = Sala.query.count()
        
        # Total de colaboradores
        total_colaboradores = Colaborador.query.count()
        
        # Pagamentos do mês atual
        inicio_mes = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        fim_mes = (inicio_mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        pagamentos_mes = Pagamento.query.filter(
            and_(
                Pagamento.data_pagamento >= inicio_mes.date(),
                Pagamento.data_pagamento <= fim_mes.date()
            )
        ).count()
        
        valor_pagamentos_mes = Pagamento.query.filter(
            and_(
                Pagamento.data_pagamento >= inicio_mes.date(),
                Pagamento.data_pagamento <= fim_mes.date()
            )
        ).with_entities(func.sum(Pagamento.valor)).scalar() or 0
        
        # Próximos concursos (próximos 30 dias)
        data_limite = datetime.now().date() + timedelta(days=30)
        proximos_concursos = Concurso.query.filter(
            and_(
                Concurso.data >= datetime.now().date(),
                Concurso.data <= data_limite,
                Concurso.status == 'ativo'
            )
        ).count()
        
        return jsonify({
            'kpis': {
                'total_concursos': total_concursos,
                'concursos_ativos': concursos_ativos,
                'total_escolas': total_escolas,
                'total_salas': total_salas,
                'total_colaboradores': total_colaboradores,
                'pagamentos_mes': pagamentos_mes,
                'valor_pagamentos_mes': float(valor_pagamentos_mes),
                'proximos_concursos': proximos_concursos
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@dashboard_bp.route('/dashboard/graficos/concursos-por-mes', methods=['GET'])
def get_concursos_por_mes():
    """Obter dados para gráfico de concursos por mês"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        # Últimos 12 meses
        data_inicio = datetime.now().replace(day=1) - timedelta(days=365)
        
        concursos_por_mes = Concurso.query.filter(
            Concurso.data >= data_inicio.date()
        ).with_entities(
            func.strftime('%Y-%m', Concurso.data).label('mes'),
            func.count(Concurso.id).label('total')
        ).group_by(
            func.strftime('%Y-%m', Concurso.data)
        ).order_by('mes').all()
        
        dados = [
            {
                'mes': resultado.mes,
                'total': resultado.total
            }
            for resultado in concursos_por_mes
        ]
        
        return jsonify({'dados': dados}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@dashboard_bp.route('/dashboard/graficos/ocupacao-salas', methods=['GET'])
def get_ocupacao_salas():
    """Obter dados para gráfico de ocupação de salas"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        # Calcular ocupação por escola (simulado - seria necessário mais lógica de negócio)
        escolas_com_salas = Escola.query.join(Sala).with_entities(
            Escola.nome_instituicao,
            func.count(Sala.id).label('total_salas'),
            func.sum(Sala.capacidade).label('capacidade_total')
        ).group_by(Escola.id, Escola.nome_instituicao).limit(10).all()
        
        dados = [
            {
                'escola': resultado.nome_instituicao,
                'total_salas': resultado.total_salas,
                'capacidade_total': resultado.capacidade_total or 0,
                'ocupacao_percentual': 75  # Simulado - seria calculado com base nos concursos
            }
            for resultado in escolas_com_salas
        ]
        
        return jsonify({'dados': dados}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@dashboard_bp.route('/dashboard/proximos-eventos', methods=['GET'])
def get_proximos_eventos():
    """Obter próximos eventos do calendário"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        data_limite = datetime.now() + timedelta(days=7)
        
        # Próximos concursos
        proximos_concursos = Concurso.query.filter(
            and_(
                Concurso.data >= datetime.now().date(),
                Concurso.data <= data_limite.date(),
                Concurso.status == 'ativo'
            )
        ).order_by(Concurso.data).limit(5).all()
        
        # Próximos eventos do calendário
        proximos_eventos_calendario = EventoCalendario.query.filter(
            and_(
                EventoCalendario.data_inicio >= datetime.now(),
                EventoCalendario.data_inicio <= data_limite
            )
        ).order_by(EventoCalendario.data_inicio).limit(5).all()
        
        eventos = []
        
        # Adicionar concursos
        for concurso in proximos_concursos:
            eventos.append({
                'tipo': 'concurso',
                'titulo': concurso.nome,
                'data': concurso.data.isoformat(),
                'descricao': f'Concurso - {concurso.previsao_inscritos or 0} inscritos previstos'
            })
        
        # Adicionar eventos do calendário
        for evento in proximos_eventos_calendario:
            eventos.append({
                'tipo': 'evento',
                'titulo': evento.titulo,
                'data': evento.data_inicio.isoformat(),
                'descricao': evento.descricao or ''
            })
        
        # Ordenar por data
        eventos.sort(key=lambda x: x['data'])
        
        return jsonify({'eventos': eventos[:10]}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@dashboard_bp.route('/dashboard/graficos/pagamentos-por-mes', methods=['GET'])
def get_pagamentos_por_mes():
    """Obter dados para gráfico de pagamentos por mês"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        # Últimos 12 meses
        data_inicio = datetime.now().replace(day=1) - timedelta(days=365)
        
        pagamentos_por_mes = Pagamento.query.filter(
            Pagamento.data_pagamento >= data_inicio.date()
        ).with_entities(
            func.strftime('%Y-%m', Pagamento.data_pagamento).label('mes'),
            func.count(Pagamento.id).label('total_pagamentos'),
            func.sum(Pagamento.valor).label('valor_total')
        ).group_by(
            func.strftime('%Y-%m', Pagamento.data_pagamento)
        ).order_by('mes').all()
        
        dados = [
            {
                'mes': resultado.mes,
                'total_pagamentos': resultado.total_pagamentos,
                'valor_total': float(resultado.valor_total or 0)
            }
            for resultado in pagamentos_por_mes
        ]
        
        return jsonify({'dados': dados}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@dashboard_bp.route('/dashboard/resumo-financeiro', methods=['GET'])
def get_resumo_financeiro():
    """Obter resumo financeiro"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        # Total geral de pagamentos
        total_pagamentos = Pagamento.query.with_entities(
            func.sum(Pagamento.valor)
        ).scalar() or 0
        
        # Pagamentos pendentes
        pagamentos_pendentes = Pagamento.query.filter_by(
            status_pagamento='Pendente'
        ).with_entities(
            func.count(Pagamento.id).label('quantidade'),
            func.sum(Pagamento.valor).label('valor_total')
        ).first()
        
        # Pagamentos realizados este mês
        inicio_mes = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        pagamentos_mes = Pagamento.query.filter(
            and_(
                Pagamento.data_pagamento >= inicio_mes.date(),
                Pagamento.status_pagamento == 'Pago'
            )
        ).with_entities(
            func.count(Pagamento.id).label('quantidade'),
            func.sum(Pagamento.valor).label('valor_total')
        ).first()
        
        return jsonify({
            'resumo_financeiro': {
                'total_pagamentos': float(total_pagamentos),
                'pagamentos_pendentes': {
                    'quantidade': pagamentos_pendentes.quantidade or 0,
                    'valor_total': float(pagamentos_pendentes.valor_total or 0)
                },
                'pagamentos_mes': {
                    'quantidade': pagamentos_mes.quantidade or 0,
                    'valor_total': float(pagamentos_mes.valor_total or 0)
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

