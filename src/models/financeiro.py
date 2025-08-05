from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Pagamento(db.Model):
    __tablename__ = 'pagamentos'
    
    id = db.Column(db.Integer, primary_key=True)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'), nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escolas.id'))
    colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'), nullable=False)
    
    funcao = db.Column(db.String(100), nullable=False)
    valor = db.Column(db.Numeric(10, 2), nullable=False)
    data_pagamento = db.Column(db.Date)
    status_pagamento = db.Column(db.String(50), default='Pendente')  # 'Pendente', 'Pago', 'Cancelado'
    
    # Dados para pagamento
    chave_pix_utilizada = db.Column(db.String(255))
    observacoes = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    concurso = db.relationship('Concurso')
    escola = db.relationship('Escola')
    colaborador = db.relationship('Colaborador', back_populates='pagamentos')
    
    def to_dict(self):
        return {
            'id': self.id,
            'concurso_id': self.concurso_id,
            'escola_id': self.escola_id,
            'colaborador_id': self.colaborador_id,
            'funcao': self.funcao,
            'valor': float(self.valor) if self.valor else None,
            'data_pagamento': self.data_pagamento.isoformat() if self.data_pagamento else None,
            'status_pagamento': self.status_pagamento,
            'chave_pix_utilizada': self.chave_pix_utilizada,
            'observacoes': self.observacoes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class AjudaCusto(db.Model):
    __tablename__ = 'ajuda_custo'
    
    id = db.Column(db.Integer, primary_key=True)
    colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'), nullable=False)
    concurso_id = db.Column(db.Integer, db.ForeignKey('concursos.id'), nullable=False)
    
    tipo_ajuda = db.Column(db.String(100), nullable=False)  # 'Transporte', 'Alimentação', 'Hospedagem', etc.
    valor = db.Column(db.Numeric(10, 2), nullable=False)
    data_pagamento = db.Column(db.Date)
    status_pagamento = db.Column(db.String(50), default='Pendente')
    
    justificativa = db.Column(db.Text)
    comprovante_arquivo = db.Column(db.String(500))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    colaborador = db.relationship('Colaborador')
    concurso = db.relationship('Concurso')
    
    def to_dict(self):
        return {
            'id': self.id,
            'colaborador_id': self.colaborador_id,
            'concurso_id': self.concurso_id,
            'tipo_ajuda': self.tipo_ajuda,
            'valor': float(self.valor) if self.valor else None,
            'data_pagamento': self.data_pagamento.isoformat() if self.data_pagamento else None,
            'status_pagamento': self.status_pagamento,
            'justificativa': self.justificativa,
            'comprovante_arquivo': self.comprovante_arquivo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

