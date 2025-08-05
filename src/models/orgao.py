from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class OrgaoPublico(db.Model):
    __tablename__ = 'orgaos_publicos'
    
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
    contato_responsavel = db.Column(db.String(255))
    telefone_contato = db.Column(db.String(20))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    documentos = db.relationship('DocumentoOrgao', back_populates='orgao', cascade='all, delete-orphan')
    oficios_recebidos = db.relationship('EntregaOficio', back_populates='destinatario')
    
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
            'contato_responsavel': self.contato_responsavel,
            'telefone_contato': self.telefone_contato,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class DocumentoOrgao(db.Model):
    __tablename__ = 'documentos_orgao'
    
    id = db.Column(db.Integer, primary_key=True)
    orgao_id = db.Column(db.Integer, db.ForeignKey('orgaos_publicos.id'), nullable=False)
    nome_arquivo = db.Column(db.String(255), nullable=False)
    caminho_arquivo = db.Column(db.String(500), nullable=False)
    tipo_documento = db.Column(db.String(100))
    descricao = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    orgao = db.relationship('OrgaoPublico', back_populates='documentos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'orgao_id': self.orgao_id,
            'nome_arquivo': self.nome_arquivo,
            'caminho_arquivo': self.caminho_arquivo,
            'tipo_documento': self.tipo_documento,
            'descricao': self.descricao,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class EntregaOficio(db.Model):
    __tablename__ = 'entrega_oficios'
    
    id = db.Column(db.Integer, primary_key=True)
    data_envio = db.Column(db.Date, nullable=False)
    destinatario_id = db.Column(db.Integer, db.ForeignKey('orgaos_publicos.id'), nullable=False)
    tipo_oficio = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Entregue', 'Lido'
    observacoes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    destinatario = db.relationship('OrgaoPublico', back_populates='oficios_recebidos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'data_envio': self.data_envio.isoformat() if self.data_envio else None,
            'destinatario_id': self.destinatario_id,
            'tipo_oficio': self.tipo_oficio,
            'status': self.status,
            'observacoes': self.observacoes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

