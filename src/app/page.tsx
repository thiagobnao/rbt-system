'use client';

import { Button } from '@/components/ui/button';
import { LogIn, Users, BarChart3, Calendar, FileText } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { useAuth } from '@/lib/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  // Se ainda está carregando, mostrar loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, mostrar página de boas-vindas
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="mx-auto h-16 w-16 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">RBT</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                RBT System
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Sistema de Gestão de Colaboradores e Eventos
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Gestão de Colaboradores</h3>
                <p className="text-sm text-muted-foreground">
                  Cadastre e gerencie colaboradores de forma eficiente
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Eventos</h3>
                <p className="text-sm text-muted-foreground">
                  Organize e acompanhe eventos e atividades
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Relatórios</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize dados e métricas importantes
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar no Sistema
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Faça login para acessar todas as funcionalidades
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se está autenticado, mostrar dashboard
  return (
    <ProtectedRoute>
      <PageLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao RBT System. Aqui você pode gerenciar colaboradores e eventos.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex-col space-y-2" asChild>
              <Link href="/collaborators">
                <Users className="h-6 w-6" />
                <span>Colaboradores</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col space-y-2" asChild>
              <Link href="/events">
                <Calendar className="h-6 w-6" />
                <span>Eventos</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col space-y-2" asChild>
              <Link href="/reports">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col space-y-2" asChild>
              <Link href="/documents">
                <FileText className="h-6 w-6" />
                <span>Documentos</span>
              </Link>
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Atividade Recente</h2>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-muted-foreground">
                Nenhuma atividade recente para exibir.
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}
