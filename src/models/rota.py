from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Rota(db.Model):
    __tablename__ = 'rotas'
    
    id = db.Column(db.Integer, primary_key=True)
    escola_origem_id = db.Column(db.Integer, db.ForeignKey('escolas.id'), nullable=False)
    escola_destino_id = db.Column(db.Integer, db.ForeignKey('escolas.id'), nullable=False)
    
    # Dados da rota calculada
    distancia_km = db.Column(db.Numeric(8, 2))
    tempo_estimado_minutos = db.Column(db.Integer)
    condicao_acesso = db.Column(db.String(255))
    
    # Dados geográficos
    coordenadas_origem = db.Column(db.Text)  # JSON com lat, lng
    coordenadas_destino = db.Column(db.Text)  # JSON com lat, lng
    geometria_rota = db.Column(db.Text)  # GeoJSON da rota completa
    
    # Metadados
    data_consulta = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    usuario_consulta_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    servico_utilizado = db.Column(db.String(50), default='OpenRouteService')
    
    # Status e observações
    status_calculo = db.Column(db.String(50), default='Sucesso')  # 'Sucesso', 'Erro', 'Parcial'
    observacoes = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    escola_origem = db.relationship('Escola', foreign_keys=[escola_origem_id])
    escola_destino = db.relationship('Escola', foreign_keys=[escola_destino_id])
    usuario_consulta = db.relationship('Usuario')
    
    def to_dict(self):
        return {
            'id': self.id,
            'escola_origem_id': self.escola_origem_id,
            'escola_destino_id': self.escola_destino_id,
            'distancia_km': float(self.distancia_km) if self.distancia_km else None,
            'tempo_estimado_minutos': self.tempo_estimado_minutos,
            'condicao_acesso': self.condicao_acesso,
            'coordenadas_origem': self.coordenadas_origem,
            'coordenadas_destino': self.coordenadas_destino,
            'geometria_rota': self.geometria_rota,
            'data_consulta': self.data_consulta.isoformat() if self.data_consulta else None,
            'usuario_consulta_id': self.usuario_consulta_id,
            'servico_utilizado': self.servico_utilizado,
            'status_calculo': self.status_calculo,
            'observacoes': self.observacoes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class FiltroRota(db.Model):
    __tablename__ = 'filtros_rota'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    nome_filtro = db.Column(db.String(255), nullable=False)
    
    # Critérios de filtro
    escola_origem_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    escola_destino_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    distancia_minima = db.Column(db.Numeric(8, 2))
    distancia_maxima = db.Column(db.Numeric(8, 2))
    tempo_minimo = db.Column(db.Integer)
    tempo_maximo = db.Column(db.Integer)
    data_consulta_inicio = db.Column(db.Date)
    data_consulta_fim = db.Column(db.Date)
    
    # Configurações do filtro
    ativo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    usuario = db.relationship('Usuario')
    escola_origem = db.relationship('Escola', foreign_keys=[escola_origem_id])
    escola_destino = db.relationship('Escola', foreign_keys=[escola_destino_id])
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'nome_filtro': self.nome_filtro,
            'escola_origem_id': self.escola_origem_id,
            'escola_destino_id': self.escola_destino_id,
            'distancia_minima': float(self.distancia_minima) if self.distancia_minima else None,
            'distancia_maxima': float(self.distancia_maxima) if self.distancia_maxima else None,
            'tempo_minimo': self.tempo_minimo,
            'tempo_maximo': self.tempo_maximo,
            'data_consulta_inicio': self.data_consulta_inicio.isoformat() if self.data_consulta_inicio else None,
            'data_consulta_fim': self.data_consulta_fim.isoformat() if self.data_consulta_fim else None,
            'ativo': self.ativo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

