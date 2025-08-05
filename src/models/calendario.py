from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class EventoCalendario(db.Model):
    __tablename__ = 'eventos_calendario'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text)
    
    data_inicio = db.Column(db.DateTime, nullable=False)
    data_fim = db.Column(db.DateTime)
    dia_inteiro = db.Column(db.Boolean, default=False)
    
    tipo_evento = db.Column(db.String(50))  # 'reuniao', 'concurso', 'visita', 'outro'
    cor = db.Column(db.String(7), default='#A8DADC')  # Cor em hexadecimal
    
    # Relacionamento com outras entidades (opcional)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'))
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    
    # Notificações
    notificacao_email = db.Column(db.Boolean, default=False)
    minutos_antes_notificacao = db.Column(db.Integer, default=30)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    usuario = db.relationship('Usuario')
    concurso = db.relationship('Concurso')
    escola = db.relationship('Escola')
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'data_inicio': self.data_inicio.isoformat() if self.data_inicio else None,
            'data_fim': self.data_fim.isoformat() if self.data_fim else None,
            'dia_inteiro': self.dia_inteiro,
            'tipo_evento': self.tipo_evento,
            'cor': self.cor,
            'concurso_id': self.concurso_id,
            'escola_id': self.escola_id,
            'notificacao_email': self.notificacao_email,
            'minutos_antes_notificacao': self.minutos_antes_notificacao,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class NotificacaoEvento(db.Model):
    __tablename__ = 'notificacoes_evento'
    
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos_calendario.id'), nullable=False)
    data_envio = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Enviado', 'Erro'
    email_destinatario = db.Column(db.String(255))
    mensagem_erro = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    evento = db.relationship('EventoCalendario')
    
    def to_dict(self):
        return {
            'id': self.id,
            'evento_id': self.evento_id,
            'data_envio': self.data_envio.isoformat() if self.data_envio else None,
            'status': self.status,
            'email_destinatario': self.email_destinatario,
            'mensagem_erro': self.mensagem_erro,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

