from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class EmailEnviado(db.Model):
    __tablename__ = 'emails_enviados'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'))
    
    data_envio = db.Column(db.DateTime, nullable=False)
    assunto = db.Column(db.String(255), nullable=False)
    corpo_email = db.Column(db.Text, nullable=False)
    
    # Destinatários
    total_destinatarios = db.Column(db.Integer, default=0)
    emails_sucesso = db.Column(db.Integer, default=0)
    emails_erro = db.Column(db.Integer, default=0)
    
    # Status do envio
    status = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Enviando', 'Concluído', 'Erro'
    
    # Assinatura digital
    assinatura_digital = db.Column(db.Boolean, default=False)
    arquivo_assinatura = db.Column(db.String(500))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    usuario = db.relationship('Usuario')
    concurso = db.relationship('Concurso')
    destinatarios = db.relationship('EmailDestinatario', back_populates='email_enviado', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'concurso_id': self.concurso_id,
            'data_envio': self.data_envio.isoformat() if self.data_envio else None,
            'assunto': self.assunto,
            'corpo_email': self.corpo_email,
            'total_destinatarios': self.total_destinatarios,
            'emails_sucesso': self.emails_sucesso,
            'emails_erro': self.emails_erro,
            'status': self.status,
            'assinatura_digital': self.assinatura_digital,
            'arquivo_assinatura': self.arquivo_assinatura,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class EmailDestinatario(db.Model):
    __tablename__ = 'email_destinatarios'
    
    id = db.Column(db.Integer, primary_key=True)
    email_enviado_id = db.Column(db.Integer, db.ForeignKey('emails_enviados.id'), nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    
    email_destinatario = db.Column(db.String(255), nullable=False)
    nome_destinatario = db.Column(db.String(255))
    
    status_envio = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Enviado', 'Erro'
    data_envio = db.Column(db.DateTime)
    mensagem_erro = db.Column(db.Text)
    
    # Relacionamentos
    email_enviado = db.relationship('EmailEnviado', back_populates='destinatarios')
    escola = db.relationship('Escola')
    
    def to_dict(self):
        return {
            'id': self.id,
            'email_enviado_id': self.email_enviado_id,
            'escola_id': self.escola_id,
            'email_destinatario': self.email_destinatario,
            'nome_destinatario': self.nome_destinatario,
            'status_envio': self.status_envio,
            'data_envio': self.data_envio.isoformat() if self.data_envio else None,
            'mensagem_erro': self.mensagem_erro
        }

class TemplateEmail(db.Model):
    __tablename__ = 'templates_email'
    
    id = db.Column(db.Integer, primary_key=True)
    nome_template = db.Column(db.String(255), nullable=False)
    assunto_padrao = db.Column(db.String(255))
    corpo_padrao = db.Column(db.Text, nullable=False)
    
    # Variáveis disponíveis no template
    variaveis_disponiveis = db.Column(db.Text)  # JSON com as variáveis que podem ser usadas
    
    ativo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome_template': self.nome_template,
            'assunto_padrao': self.assunto_padrao,
            'corpo_padrao': self.corpo_padrao,
            'variaveis_disponiveis': self.variaveis_disponiveis,
            'ativo': self.ativo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

