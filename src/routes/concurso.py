from flask import Blueprint, request, jsonify, session
from src.models.concurso import Concurso, ResumoContratacao, VagaFuncao, ConcursoEscola, db
from src.models.escola import Escola
from src.models.banca import BancaOrganizadora
from datetime import datetime, date

concurso_bp = Blueprint('concurso', __name__)

def require_auth():
    """Decorator para verificar autenticação"""
    if not session.get('logged_in'):
        return jsonify({'error': 'Usuário não autenticado'}), 401
    return None

@concurso_bp.route('/concursos', methods=['GET'])
def get_concursos():
    """Listar todos os concursos"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        
        query = Concurso.query
        
        if status:
            query = query.filter_by(status=status)
        
        concursos = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'concursos': [concurso.to_dict() for concurso in concursos.items],
            'total': concursos.total,
            'pages': concursos.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos', methods=['POST'])
def create_concurso():
    """Criar novo concurso"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        data = request.get_json()
        
        if not data or not data.get('nome') or not data.get('data'):
            return jsonify({'error': 'Nome e data são obrigatórios'}), 400
        
        # Converter string de data para objeto date
        data_concurso = datetime.strptime(data.get('data'), '%Y-%m-%d').date()
        
        concurso = Concurso(
            nome=data.get('nome'),
            data=data_concurso,
            banca_organizadora_id=data.get('banca_organizadora_id'),
            previsao_inscritos=data.get('previsao_inscritos'),
            status=data.get('status', 'ativo')
        )
        
        db.session.add(concurso)
        db.session.commit()
        
        return jsonify({
            'message': 'Concurso criado com sucesso',
            'concurso': concurso.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/<int:concurso_id>', methods=['GET'])
def get_concurso(concurso_id):
    """Obter detalhes de um concurso específico"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concurso = Concurso.query.get_or_404(concurso_id)
        
        # Incluir dados relacionados
        concurso_data = concurso.to_dict()
        
        # Adicionar banca organizadora
        if concurso.banca_organizadora:
            concurso_data['banca_organizadora'] = concurso.banca_organizadora.to_dict()
        
        # Adicionar resumo de contratação
        if concurso.resumo_contratacao:
            concurso_data['resumo_contratacao'] = concurso.resumo_contratacao.to_dict()
        
        # Adicionar locais de aplicação
        concurso_data['locais_aplicacao'] = [
            {
                **local.to_dict(),
                'escola': local.escola.to_dict() if local.escola else None
            }
            for local in concurso.locais_aplicacao
        ]
        
        return jsonify({'concurso': concurso_data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/<int:concurso_id>', methods=['PUT'])
def update_concurso(concurso_id):
    """Atualizar concurso"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concurso = Concurso.query.get_or_404(concurso_id)
        data = request.get_json()
        
        if data.get('nome'):
            concurso.nome = data.get('nome')
        if data.get('data'):
            concurso.data = datetime.strptime(data.get('data'), '%Y-%m-%d').date()
        if data.get('banca_organizadora_id'):
            concurso.banca_organizadora_id = data.get('banca_organizadora_id')
        if data.get('previsao_inscritos'):
            concurso.previsao_inscritos = data.get('previsao_inscritos')
        if data.get('status'):
            concurso.status = data.get('status')
        
        concurso.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Concurso atualizado com sucesso',
            'concurso': concurso.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/<int:concurso_id>', methods=['DELETE'])
def delete_concurso(concurso_id):
    """Excluir concurso"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concurso = Concurso.query.get_or_404(concurso_id)
        db.session.delete(concurso)
        db.session.commit()
        
        return jsonify({'message': 'Concurso excluído com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/<int:concurso_id>/resumo-contratacao', methods=['POST'])
def create_resumo_contratacao(concurso_id):
    """Criar resumo de contratação para um concurso"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concurso = Concurso.query.get_or_404(concurso_id)
        data = request.get_json()
        
        # Verificar se já existe resumo
        if concurso.resumo_contratacao:
            return jsonify({'error': 'Resumo de contratação já existe para este concurso'}), 400
        
        resumo = ResumoContratacao(
            concurso_id=concurso_id,
            valor_material_limpeza=data.get('valor_material_limpeza'),
            valor_kit_lanche=data.get('valor_kit_lanche')
        )
        
        db.session.add(resumo)
        db.session.flush()  # Para obter o ID do resumo
        
        # Adicionar vagas por função
        vagas_funcao = data.get('vagas_funcao', [])
        for vaga_data in vagas_funcao:
            vaga = VagaFuncao(
                resumo_contratacao_id=resumo.id,
                funcao=vaga_data.get('funcao'),
                quantidade=vaga_data.get('quantidade'),
                valor_unitario=vaga_data.get('valor_unitario')
            )
            db.session.add(vaga)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Resumo de contratação criado com sucesso',
            'resumo': resumo.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/<int:concurso_id>/escolas', methods=['POST'])
def add_escola_concurso(concurso_id):
    """Adicionar escola ao concurso"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concurso = Concurso.query.get_or_404(concurso_id)
        data = request.get_json()
        
        if not data or not data.get('escola_id'):
            return jsonify({'error': 'ID da escola é obrigatório'}), 400
        
        escola_id = data.get('escola_id')
        tipo = data.get('tipo', 'indicado')
        
        # Verificar se a escola existe
        escola = Escola.query.get_or_404(escola_id)
        
        # Verificar se a associação já existe
        associacao_existente = ConcursoEscola.query.filter_by(
            concurso_id=concurso_id,
            escola_id=escola_id
        ).first()
        
        if associacao_existente:
            return jsonify({'error': 'Escola já está associada a este concurso'}), 400
        
        associacao = ConcursoEscola(
            concurso_id=concurso_id,
            escola_id=escola_id,
            tipo=tipo
        )
        
        db.session.add(associacao)
        db.session.commit()
        
        return jsonify({
            'message': 'Escola adicionada ao concurso com sucesso',
            'associacao': associacao.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@concurso_bp.route('/concursos/ativos', methods=['GET'])
def get_concursos_ativos():
    """Listar concursos ativos"""
    auth_check = require_auth()
    if auth_check:
        return auth_check
    
    try:
        concursos = Concurso.query.filter_by(status='ativo').all()
        
        return jsonify({
            'concursos': [concurso.to_dict() for concurso in concursos]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

