from flask import Blueprint, request, jsonify, session
from src.models.auth import Usuario, db
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint para autenticação de usuário"""
    try:
        data = request.get_json()
        
        if not data or not data.get('login') or not data.get('senha'):
            return jsonify({'error': 'Login e senha são obrigatórios'}), 400
        
        login = data.get('login')
        senha = data.get('senha')
        
        # Buscar usuário no banco
        usuario = Usuario.query.filter_by(login=login).first()
        
        if not usuario or not usuario.verificar_senha(senha):
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        # Criar sessão
        session['user_id'] = usuario.id
        session['user_login'] = usuario.login
        session['user_perfil'] = usuario.perfil
        session['logged_in'] = True
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': usuario.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Endpoint para logout do usuário"""
    try:
        session.clear()
        return jsonify({'message': 'Logout realizado com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/session', methods=['GET'])
def check_session():
    """Endpoint para verificar se o usuário está logado"""
    try:
        if session.get('logged_in'):
            usuario = Usuario.query.get(session.get('user_id'))
            if usuario:
                return jsonify({
                    'logged_in': True,
                    'user': usuario.to_dict()
                }), 200
        
        return jsonify({'logged_in': False}), 200
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/change-password', methods=['PUT'])
def change_password():
    """Endpoint para alterar senha do usuário logado"""
    try:
        if not session.get('logged_in'):
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        data = request.get_json()
        
        if not data or not data.get('senha_atual') or not data.get('nova_senha'):
            return jsonify({'error': 'Senha atual e nova senha são obrigatórias'}), 400
        
        usuario = Usuario.query.get(session.get('user_id'))
        if not usuario:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Verificar senha atual
        if not usuario.verificar_senha(data.get('senha_atual')):
            return jsonify({'error': 'Senha atual incorreta'}), 400
        
        # Alterar senha
        usuario.alterar_senha(data.get('nova_senha'))
        usuario.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'message': 'Senha alterada com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/change-login', methods=['PUT'])
def change_login():
    """Endpoint para alterar login do usuário logado"""
    try:
        if not session.get('logged_in'):
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        data = request.get_json()
        
        if not data or not data.get('novo_login'):
            return jsonify({'error': 'Novo login é obrigatório'}), 400
        
        novo_login = data.get('novo_login')
        
        # Verificar se o novo login já existe
        usuario_existente = Usuario.query.filter_by(login=novo_login).first()
        if usuario_existente and usuario_existente.id != session.get('user_id'):
            return jsonify({'error': 'Login já está em uso'}), 400
        
        usuario = Usuario.query.get(session.get('user_id'))
        if not usuario:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Alterar login
        usuario.login = novo_login
        usuario.updated_at = datetime.utcnow()
        db.session.commit()
        
        # Atualizar sessão
        session['user_login'] = novo_login
        
        return jsonify({
            'message': 'Login alterado com sucesso',
            'user': usuario.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    """Endpoint para obter dados do perfil do usuário logado"""
    try:
        if not session.get('logged_in'):
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        usuario = Usuario.query.get(session.get('user_id'))
        if not usuario:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        return jsonify({'user': usuario.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

