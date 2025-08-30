export interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
}

export interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

export interface SidebarProps {
  items: NavigationItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

export interface LayoutContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeNavigation: string;
  setActiveNavigation: (item: string) => void;
}
