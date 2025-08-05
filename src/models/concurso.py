from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Concurso(db.Model):
    __tablename__ = 'concursos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    data = db.Column(db.Date, nullable=False)
    banca_organizadora_id = db.Column(db.Integer, db.ForeignKey('bancas_organizadoras.id'))
    previsao_inscritos = db.Column(db.Integer)
    status = db.Column(db.String(50), default='ativo')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    banca_organizadora = db.relationship('BancaOrganizadora', backref='concursos')
    locais_aplicacao = db.relationship('ConcursoEscola', back_populates='concurso')
    resumo_contratacao = db.relationship('ResumoContratacao', back_populates='concurso', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'data': self.data.isoformat() if self.data else None,
            'banca_organizadora_id': self.banca_organizadora_id,
            'previsao_inscritos': self.previsao_inscritos,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ResumoContratacao(db.Model):
    __tablename__ = 'resumos_contratacao'
    
    id = db.Column(db.Integer, primary_key=True)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'), nullable=False)
    valor_material_limpeza = db.Column(db.Numeric(10, 2))
    valor_kit_lanche = db.Column(db.Numeric(10, 2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    concurso = db.relationship('Concurso', back_populates='resumo_contratacao')
    vagas_funcao = db.relationship('VagaFuncao', back_populates='resumo_contratacao')
    
    def to_dict(self):
        return {
            'id': self.id,
            'concurso_id': self.concurso_id,
            'valor_material_limpeza': float(self.valor_material_limpeza) if self.valor_material_limpeza else None,
            'valor_kit_lanche': float(self.valor_kit_lanche) if self.valor_kit_lanche else None,
            'vagas_funcao': [vaga.to_dict() for vaga in self.vagas_funcao]
        }

class VagaFuncao(db.Model):
    __tablename__ = 'vagas_funcao'
    
    id = db.Column(db.Integer, primary_key=True)
    resumo_contratacao_id = db.Column(db.Integer, db.ForeignKey('resumos_contratacao.id'), nullable=False)
    funcao = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    valor_unitario = db.Column(db.Numeric(10, 2))
    
    # Relacionamentos
    resumo_contratacao = db.relationship('ResumoContratacao', back_populates='vagas_funcao')
    
    def to_dict(self):
        return {
            'id': self.id,
            'funcao': self.funcao,
            'quantidade': self.quantidade,
            'valor_unitario': float(self.valor_unitario) if self.valor_unitario else None
        }

class ConcursoEscola(db.Model):
    __tablename__ = 'concurso_escola'
    
    id = db.Column(db.Integer, primary_key=True)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'), nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'), nullable=False)
    tipo = db.Column(db.String(50))  # 'indicado' ou 'selecionado'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    concurso = db.relationship('Concurso', back_populates='locais_aplicacao')
    escola = db.relationship('Escola', back_populates='concursos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'concurso_id': self.concurso_id,
            'escola_id': self.escola_id,
            'tipo': self.tipo,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

