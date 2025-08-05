from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Colaborador(db.Model):
    __tablename__ = 'colaboradores'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    
    # Endereço
    logradouro = db.Column(db.String(255))
    numero = db.Column(db.String(20))
    bairro = db.Column(db.String(100))
    cep = db.Column(db.String(10))
    municipio = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    
    # Documentos
    rg = db.Column(db.String(20))
    orgao_emissor = db.Column(db.String(50))
    data_expedicao = db.Column(db.Date)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    pis_pasep = db.Column(db.String(20))
    
    # Dados bancários
    banco = db.Column(db.String(100))
    tipo_conta = db.Column(db.String(50))
    numero_agencia = db.Column(db.String(20))
    digito_agencia = db.Column(db.String(5))
    numero_conta = db.Column(db.String(20))
    digito_conta = db.Column(db.String(5))
    chave_pix = db.Column(db.String(255))
    
    # Dados pessoais
    data_nascimento = db.Column(db.Date)
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))
    escolaridade = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    pagamentos = db.relationship('Pagamento', back_populates='colaborador')
    participacoes = db.relationship('ParticipacaoEvento', back_populates='colaborador')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'logradouro': self.logradouro,
            'numero': self.numero,
            'bairro': self.bairro,
            'cep': self.cep,
            'municipio': self.municipio,
            'uf': self.uf,
            'rg': self.rg,
            'orgao_emissor': self.orgao_emissor,
            'data_expedicao': self.data_expedicao.isoformat() if self.data_expedicao else None,
            'cpf': self.cpf,
            'pis_pasep': self.pis_pasep,
            'banco': self.banco,
            'tipo_conta': self.tipo_conta,
            'numero_agencia': self.numero_agencia,
            'digito_agencia': self.digito_agencia,
            'numero_conta': self.numero_conta,
            'digito_conta': self.digito_conta,
            'chave_pix': self.chave_pix,
            'data_nascimento': self.data_nascimento.isoformat() if self.data_nascimento else None,
            'telefone': self.telefone,
            'email': self.email,
            'escolaridade': self.escolaridade,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ParticipacaoEvento(db.Model):
    __tablename__ = 'participacao_evento'
    
    id = db.Column(db.Integer, primary_key=True)
    colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'), nullable=False)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'), nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    funcao = db.Column(db.String(100), nullable=False)
    coordenador_local = db.Column(db.String(255))
    assistente = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    colaborador = db.relationship('Colaborador', back_populates='participacoes')
    concurso = db.relationship('Concurso')
    escola = db.relationship('Escola')
    
    def to_dict(self):
        return {
            'id': self.id,
            'colaborador_id': self.colaborador_id,
            'concurso_id': self.concurso_id,
            'escola_id': self.escola_id,
            'funcao': self.funcao,
            'coordenador_local': self.coordenador_local,
            'assistente': self.assistente,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

