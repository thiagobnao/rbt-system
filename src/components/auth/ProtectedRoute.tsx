'use client';

import { ReactNode } from 'react';
import { useAuthGuard } from '@/lib/hooks/useAuth';
import { AuthRole } from '@/lib/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: AuthRole;
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthGuard(requiredRole);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, mostrar fallback ou redirecionar
  if (!isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-destructive-foreground font-bold text-lg">!</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground">Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  // Se tem role específica e usuário não tem permissão
  if (requiredRole && user?.role !== requiredRole) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-destructive-foreground font-bold text-lg">!</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Permissão Insuficiente</h2>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  // Tudo ok, mostrar conteúdo
  return <>{children}</>;
}
