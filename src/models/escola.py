from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Escola(db.Model):
    __tablename__ = 'escolas'
    
    id = db.Column(db.Integer, primary_key=True)
    nome_instituicao = db.Column(db.String(255), nullable=False)
    razao_social = db.Column(db.String(255))
    cnpj = db.Column(db.String(18), unique=True)
    
    # Endereço
    logradouro = db.Column(db.String(255))
    numero = db.Column(db.String(20))
    bairro = db.Column(db.String(100))
    cep = db.Column(db.String(10))
    municipio = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    
    # Diretor
    diretor_nome = db.Column(db.String(255))
    diretor_cpf = db.Column(db.String(14))
    diretor_telefone = db.Column(db.String(20))
    
    # Contato
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))
    
    # Inscrições
    inscricao_estadual = db.Column(db.String(20))
    inscricao_municipal = db.Column(db.String(20))
    
    # Localização e códigos
    localizacao_google_maps = db.Column(db.Text)
    codigo_energia = db.Column(db.String(50))
    codigo_agua = db.Column(db.String(50))
    
    # Dados bancários
    banco = db.Column(db.String(100))
    tipo_conta = db.Column(db.String(50))
    numero_agencia = db.Column(db.String(20))
    digito_agencia = db.Column(db.String(5))
    numero_conta = db.Column(db.String(20))
    digito_conta = db.Column(db.String(5))
    chave_pix = db.Column(db.String(255))
    
    # Tipo de custo
    tipo_custo = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    salas = db.relationship('Sala', back_populates='escola', cascade='all, delete-orphan')
    fotos = db.relationship('FotoEscola', back_populates='escola', cascade='all, delete-orphan')
    concursos = db.relationship('ConcursoEscola', back_populates='escola')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome_instituicao': self.nome_instituicao,
            'razao_social': self.razao_social,
            'cnpj': self.cnpj,
            'logradouro': self.logradouro,
            'numero': self.numero,
            'bairro': self.bairro,
            'cep': self.cep,
            'municipio': self.municipio,
            'uf': self.uf,
            'diretor_nome': self.diretor_nome,
            'diretor_cpf': self.diretor_cpf,
            'diretor_telefone': self.diretor_telefone,
            'telefone': self.telefone,
            'email': self.email,
            'inscricao_estadual': self.inscricao_estadual,
            'inscricao_municipal': self.inscricao_municipal,
            'localizacao_google_maps': self.localizacao_google_maps,
            'codigo_energia': self.codigo_energia,
            'codigo_agua': self.codigo_agua,
            'banco': self.banco,
            'tipo_conta': self.tipo_conta,
            'numero_agencia': self.numero_agencia,
            'digito_agencia': self.digito_agencia,
            'numero_conta': self.numero_conta,
            'digito_conta': self.digito_conta,
            'chave_pix': self.chave_pix,
            'tipo_custo': self.tipo_custo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Sala(db.Model):
    __tablename__ = 'salas'
    
    id = db.Column(db.Integer, primary_key=True)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'), nullable=False)
    bloco = db.Column(db.String(50))
    andar = db.Column(db.String(20))
    nome = db.Column(db.String(100), nullable=False)
    capacidade = db.Column(db.Integer)
    largura = db.Column(db.Numeric(5, 2))
    comprimento = db.Column(db.Numeric(5, 2))
    mobiliario = db.Column(db.String(100))  # 'Cadeira dupla', 'Mesa com cadeira', 'Cadeira universitária'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    escola = db.relationship('Escola', back_populates='salas')
    
    def to_dict(self):
        return {
            'id': self.id,
            'escola_id': self.escola_id,
            'bloco': self.bloco,
            'andar': self.andar,
            'nome': self.nome,
            'capacidade': self.capacidade,
            'largura': float(self.largura) if self.largura else None,
            'comprimento': float(self.comprimento) if self.comprimento else None,
            'mobiliario': self.mobiliario,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class FotoEscola(db.Model):
    __tablename__ = 'fotos_escola'
    
    id = db.Column(db.Integer, primary_key=True)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)  # 'Fachada', 'Sala', 'Corredor', 'Banheiro', 'Acesso', 'Pátio / Quadra'
    nome_arquivo = db.Column(db.String(255), nullable=False)
    caminho_arquivo = db.Column(db.String(500), nullable=False)
    descricao = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    escola = db.relationship('Escola', back_populates='fotos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'escola_id': self.escola_id,
            'categoria': self.categoria,
            'nome_arquivo': self.nome_arquivo,
            'caminho_arquivo': self.caminho_arquivo,
            'descricao': self.descricao,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

