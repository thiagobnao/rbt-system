from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class SecretariaMunicipal(db.Model):
    __tablename__ = 'secretarias_municipais'
    
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
    formularios_cessao = db.relationship('FormularioCessao', back_populates='secretaria_municipal', cascade='all, delete-orphan')
    
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

class SecretariaEstadual(db.Model):
    __tablename__ = 'secretarias_estaduais'
    
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
    formularios_cessao = db.relationship('FormularioCessao', back_populates='secretaria_estadual', cascade='all, delete-orphan')
    
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

class FormularioCessao(db.Model):
    __tablename__ = 'formularios_cessao'
    
    id = db.Column(db.Integer, primary_key=True)
    secretaria_municipal_id = db.Column(db.Integer, db.ForeignKey('secretarias_municipais.id'))
    secretaria_estadual_id = db.Column(db.Integer, db.ForeignKey('secretarias_estaduais.id'))
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'))
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    
    data_solicitacao = db.Column(db.Date, nullable=False)
    hora_inicio = db.Column(db.Time)
    hora_fim = db.Column(db.Time)
    evento_descricao = db.Column(db.Text)
    
    status = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Aprovado', 'Rejeitado'
    assinatura_eletronica = db.Column(db.Boolean, default=False)
    data_assinatura = db.Column(db.DateTime)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    secretaria_municipal = db.relationship('SecretariaMunicipal', back_populates='formularios_cessao')
    secretaria_estadual = db.relationship('SecretariaEstadual', back_populates='formularios_cessao')
    concurso = db.relationship('Concurso')
    escola = db.relationship('Escola')
    anexos = db.relationship('AnexoFormulario', back_populates='formulario', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'secretaria_municipal_id': self.secretaria_municipal_id,
            'secretaria_estadual_id': self.secretaria_estadual_id,
            'concurso_id': self.concurso_id,
            'escola_id': self.escola_id,
            'data_solicitacao': self.data_solicitacao.isoformat() if self.data_solicitacao else None,
            'hora_inicio': self.hora_inicio.isoformat() if self.hora_inicio else None,
            'hora_fim': self.hora_fim.isoformat() if self.hora_fim else None,
            'evento_descricao': self.evento_descricao,
            'status': self.status,
            'assinatura_eletronica': self.assinatura_eletronica,
            'data_assinatura': self.data_assinatura.isoformat() if self.data_assinatura else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class AnexoFormulario(db.Model):
    __tablename__ = 'anexos_formulario'
    
    id = db.Column(db.Integer, primary_key=True)
    formulario_id = db.Column(db.Integer, db.ForeignKey('formularios_cessao.id'), nullable=False)
    nome_arquivo = db.Column(db.String(255), nullable=False)
    caminho_arquivo = db.Column(db.String(500), nullable=False)
    tipo_arquivo = db.Column(db.String(50))
    tamanho_arquivo = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    formulario = db.relationship('FormularioCessao', back_populates='anexos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'formulario_id': self.formulario_id,
            'nome_arquivo': self.nome_arquivo,
            'caminho_arquivo': self.caminho_arquivo,
            'tipo_arquivo': self.tipo_arquivo,
            'tamanho_arquivo': self.tamanho_arquivo,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

