from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Fornecedor(db.Model):
    __tablename__ = 'fornecedores'
    
    id = db.Column(db.Integer, primary_key=True)
    tipo_servico = db.Column(db.String(100), nullable=False)  # 'Refeições', 'material de limpeza', 'som', etc.
    nome = db.Column(db.String(255), nullable=False)
    cnpj = db.Column(db.String(18), unique=True, nullable=False)
    codigo_atividade_economica = db.Column(db.String(20))
    descricao_atividade_economica = db.Column(db.String(255))
    
    # Endereço
    logradouro = db.Column(db.String(255))
    numero = db.Column(db.String(20))
    bairro = db.Column(db.String(100))
    cep = db.Column(db.String(10))
    municipio = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    
    # Inscrições
    inscricao_estadual = db.Column(db.String(20))
    inscricao_municipal = db.Column(db.String(20))
    
    # Contato
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    documentos = db.relationship('DocumentoFornecedor', back_populates='fornecedor', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'tipo_servico': self.tipo_servico,
            'nome': self.nome,
            'cnpj': self.cnpj,
            'codigo_atividade_economica': self.codigo_atividade_economica,
            'descricao_atividade_economica': self.descricao_atividade_economica,
            'logradouro': self.logradouro,
            'numero': self.numero,
            'bairro': self.bairro,
            'cep': self.cep,
            'municipio': self.municipio,
            'uf': self.uf,
            'inscricao_estadual': self.inscricao_estadual,
            'inscricao_municipal': self.inscricao_municipal,
            'telefone': self.telefone,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class DocumentoFornecedor(db.Model):
    __tablename__ = 'documentos_fornecedor'
    
    id = db.Column(db.Integer, primary_key=True)
    fornecedor_id = db.Column(db.Integer, db.ForeignKey('fornecedores.id'), nullable=False)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'))
    tipo_documento = db.Column(db.String(50), nullable=False)  # 'orcamento', 'nota_fiscal'
    nome_arquivo = db.Column(db.String(255), nullable=False)
    caminho_arquivo = db.Column(db.String(500), nullable=False)
    descricao = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    fornecedor = db.relationship('Fornecedor', back_populates='documentos')
    concurso = db.relationship('Concurso')
    
    def to_dict(self):
        return {
            'id': self.id,
            'fornecedor_id': self.fornecedor_id,
            'concurso_id': self.concurso_id,
            'tipo_documento': self.tipo_documento,
            'nome_arquivo': self.nome_arquivo,
            'caminho_arquivo': self.caminho_arquivo,
            'descricao': self.descricao,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

