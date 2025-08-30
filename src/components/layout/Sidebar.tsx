'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SidebarProps, NavigationItem } from '@/lib/types/layout';
import { useLayout } from './LayoutContext';

export function Sidebar({ 
  items, 
  isCollapsed, 
  onToggle, 
  activeItem, 
  onItemClick 
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useLayout();

  const collapsed = isCollapsed ?? sidebarCollapsed;
  const handleToggle = onToggle ?? toggleSidebar;

  const handleItemClick = (item: NavigationItem) => {
    if (item.disabled) return;
    
    onItemClick?.(item);
    router.push(item.href);
  };

  const isActive = (item: NavigationItem) => {
    return activeItem === item.title || pathname === item.href;
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300 h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        {!collapsed && (
          <h2 className="text-lg font-semibold">Navegação</h2>
        )}
        <div className="flex items-center gap-1">
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="md:hidden h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar menu</span>
          </Button>
          
          {/* Desktop toggle button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="hidden md:flex h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Button
                key={item.title}
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "h-10 w-10 p-0" : "h-10 px-3",
                  active && "bg-secondary text-secondary-foreground",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
              >
                {Icon && (
                  <Icon className={cn(
                    "h-4 w-4",
                    collapsed ? "mx-auto" : "mr-2"
                  )} />
                )}
                {!collapsed && (
                  <span className="truncate">{item.title}</span>
                )}
                {item.badge && !collapsed && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
