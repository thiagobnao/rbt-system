from src.models.user import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(80), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    perfil = db.Column(db.String(20), default='usuario')  # 'admin' ou 'usuario'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __init__(self, login, senha, perfil='usuario'):
        self.login = login
        self.senha_hash = generate_password_hash(senha)
        self.perfil = perfil
    
    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)
    
    def alterar_senha(self, nova_senha):
        self.senha_hash = generate_password_hash(nova_senha)
    
    def to_dict(self):
        return {
            'id': self.id,
            'login': self.login,
            'perfil': self.perfil,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Usuario {self.login}>'

