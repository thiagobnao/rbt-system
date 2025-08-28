'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar se há token de autenticação
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleGoToCollaborators = () => {
    router.push('/collaborators');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Mostrar loading enquanto verifica autenticação
  if (isAuthenticated === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🚀 RBT System
        </h1>
        <p className="text-center text-lg mb-4">
          Sistema de Gestão de Colaboradores e Eventos
        </p>
        
        {isAuthenticated ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-6">
              Bem-vindo! Você está autenticado no sistema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGoToCollaborators}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Gerenciar Colaboradores
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-6">
              Faça login para acessar o sistema de gestão.
            </p>
            <Button 
              onClick={handleLogin}
              className="flex items-center gap-2 mx-auto"
            >
              <LogIn className="h-4 w-4" />
              Fazer Login
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
