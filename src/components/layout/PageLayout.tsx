'use client';

import { useState, useEffect } from 'react';
import { useLayout } from './LayoutContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { NavigationItem } from '@/lib/types/layout';
import { 
  Users, 
  Calendar, 
  Settings, 
  Home,
  BarChart3,
  FileText,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/useAuth';

export interface PageLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

const defaultNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
    disabled: false,
  },
  {
    title: 'Colaboradores',
    href: '/collaborators',
    icon: Users,
    disabled: false,
  },
  {
    title: 'Eventos',
    href: '/events',
    icon: Calendar,
    disabled: true, // Futura funcionalidade
  },
  {
    title: 'Relatórios',
    href: '/reports',
    icon: BarChart3,
    disabled: true, // Futura funcionalidade
  },
  {
    title: 'Documentos',
    href: '/documents',
    icon: FileText,
    disabled: true, // Futura funcionalidade
  },
  {
    title: 'Organizações',
    href: '/organizations',
    icon: Building2,
    disabled: true, // Futura funcionalidade
  },
  {
    title: 'Configurações',
    href: '/settings',
    icon: Settings,
    disabled: true, // Futura funcionalidade
  },
];

export function PageLayout({ 
  children, 
  showSidebar = true, 
  showHeader = true, 
  className 
}: PageLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useLayout();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Verificar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fechar menu mobile ao clicar fora
  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  };

  // Se não estiver autenticado, mostrar apenas o conteúdo sem layout
  if (isAuthenticated === false) {
    return <div className={className}>{children}</div>;
  }

  // Se ainda está verificando autenticação, mostrar loading
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className={cn(
          "fixed md:relative z-50",
          isMobile && !mobileMenuOpen && "-translate-x-full",
          "transition-transform duration-300 ease-in-out"
        )}>
          <Sidebar 
            items={defaultNavigation}
            isCollapsed={isMobile ? false : sidebarCollapsed}
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        {showHeader && (
          <Header 
            user={user || undefined}
            onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            showMobileMenu={mobileMenuOpen}
          />
        )}

        {/* Page content */}
        <main className={cn(
          "flex-1 overflow-auto bg-background",
          className
        )}>
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
