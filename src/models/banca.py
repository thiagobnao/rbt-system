from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class BancaOrganizadora(db.Model):
    __tablename__ = 'bancas_organizadoras'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cnpj = db.Column(db.String(18), unique=True, nullable=False)
    
    # Endereço
    logradouro = db.Column(db.String(255))
    numero = db.Column(db.String(20))
    bairro = db.Column(db.String(100))
    cep = db.Column(db.String(10))
    municipio = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    
    # Inscrições
    inscricao_municipal = db.Column(db.String(20))
    inscricao_estadual = db.Column(db.String(20))
    
    # Contato
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    contatos_setoriais = db.relationship('ContatoSetorial', back_populates='banca', cascade='all, delete-orphan')
    formularios = db.relationship('FormularioBanca', back_populates='banca', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'cnpj': self.cnpj,
            'logradouro': self.logradouro,
            'numero': self.numero,
            'bairro': self.bairro,
            'cep': self.cep,
            'municipio': self.municipio,
            'uf': self.uf,
            'inscricao_municipal': self.inscricao_municipal,
            'inscricao_estadual': self.inscricao_estadual,
            'telefone': self.telefone,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ContatoSetorial(db.Model):
    __tablename__ = 'contatos_setoriais'
    
    id = db.Column(db.Integer, primary_key=True)
    banca_id = db.Column(db.Integer, db.ForeignKey('bancas_organizadoras.id'), nullable=False)
    setor = db.Column(db.String(100), nullable=False)  # 'Financeiro', 'Logistica', 'Adm', 'Direção', etc
    nome_contato = db.Column(db.String(255))
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    banca = db.relationship('BancaOrganizadora', back_populates='contatos_setoriais')
    
    def to_dict(self):
        return {
            'id': self.id,
            'banca_id': self.banca_id,
            'setor': self.setor,
            'nome_contato': self.nome_contato,
            'telefone': self.telefone,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class FormularioBanca(db.Model):
    __tablename__ = 'formularios_banca'
    
    id = db.Column(db.Integer, primary_key=True)
    banca_id = db.Column(db.Integer, db.ForeignKey('bancas_organizadoras.id'), nullable=False)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'))
    nome_arquivo = db.Column(db.String(255), nullable=False)
    caminho_arquivo = db.Column(db.String(500), nullable=False)
    descricao = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    banca = db.relationship('BancaOrganizadora', back_populates='formularios')
    concurso = db.relationship('Concurso')
    
    def to_dict(self):
        return {
            'id': self.id,
            'banca_id': self.banca_id,
            'concurso_id': self.concurso_id,
            'nome_arquivo': self.nome_arquivo,
            'caminho_arquivo': self.caminho_arquivo,
            'descricao': self.descricao,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

