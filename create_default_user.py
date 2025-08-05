#!/usr/bin/env python3
import sys
import os

# Adicionar o diretório raiz ao path
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app
from src.models.auth import Usuario
from src.models.user import db

def create_default_user():
    with app.app_context():
        # Verificar se o usuário padrão já existe
        usuario_existente = Usuario.query.filter_by(login='betha').first()
        if not usuario_existente:
            # Criar usuário padrão
            usuario_padrao = Usuario(login='betha', senha='12345', perfil='admin')
            db.session.add(usuario_padrao)
            db.session.commit()
            print('✅ Usuário padrão criado: betha / 12345')
        else:
            print('ℹ️  Usuário padrão já existe')

if __name__ == '__main__':
    create_default_user()

