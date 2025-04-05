import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { ThemeToggle } from '@/components/ThemeToggle';
import TokenBadge from '@/components/TokenBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import NotificationButton from '@/components/ui/NotificationButton';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Facebook,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Target,
  User,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

const navItems = [
  { name: 'Painel', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Gerenciar Campanhas', path: '/campaign-management', icon: Target },
  { name: 'Análise de Campanhas', path: '/campaign-analysis', icon: BarChart },
  { name: 'Relatórios', path: '/reports', icon: FileText },
  { name: 'Integração', path: '/integration', icon: Facebook },
  { name: 'Planos', path: '/plans', icon: CreditCard },
  { name: 'Ajuda', path: '/help', icon: HelpCircle },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, handleLogout } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notifications, markAsRead, clearAll } = useNotifications();
  const [userName, setUserName] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);

    if (user) {
      try {
        setUserName(user?.user_metadata?.name || user.email);
      } catch (e) {
        console.error('Erro ao processar dados do usuário:', e);
      }
    }

    const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setSidebarCollapsed(collapsed);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === 'Escape' && searchOpen) {
        event.preventDefault();
        setSearchOpen(false);
      }

      if (event.key === 'b' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        toggleSidebar();
      }

      if (event.key === 'g') {
        const handleSecondKey = (e: KeyboardEvent) => {
          if (e.key === 'd') navigate('/');
          else if (e.key === 'c') navigate('/campaign-management');
          else if (e.key === 'a') navigate('/campaign-analysis');
          else if (e.key === 'r') navigate('/reports');
          else if (e.key === 'i') navigate('/integration');
          else if (e.key === 'p') navigate('/plans');
          else if (e.key === 'h') navigate('/help');
          else if (e.key === 's') navigate('/settings');

          window.removeEventListener('keydown', handleSecondKey);
        };

        window.addEventListener('keydown', handleSecondKey, { once: true });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, searchOpen]);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: 'Pesquisando',
        description: `Buscando por: "${searchQuery}"`,
      });
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed z-50 top-4 right-4 flex gap-2 md:hidden">
        <TokenBadge />
        <NotificationButton
          notifications={notifications}
          onNotificationRead={markAsRead}
          onClearAll={clearAll}
        />
        <ThemeToggle />
        <button
          className="p-2 rounded-full bg-primary text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24">
          <div className="w-full max-w-lg bg-card border rounded-lg shadow-lg animate-fade-in animate-slide-up">
            <form onSubmit={handleSearch} className="p-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit" variant="default">
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSearchOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Pressione{' '}
                <kbd className="px-1 py-0.5 text-xs font-semibold text-muted-foreground bg-secondary rounded border border-border">
                  Esc
                </kbd>{' '}
                para fechar ou{' '}
                <kbd className="px-1 py-0.5 text-xs font-semibold text-muted-foreground bg-secondary rounded border border-border">
                  Enter
                </kbd>{' '}
                para buscar
              </div>
            </form>

            <div className="border-t p-4">
              <div className="text-sm font-medium mb-2">Buscas populares:</div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('Campanhas')}
                >
                  Campanhas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('Relatórios')}
                >
                  Relatórios
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('Facebook Ads')}
                >
                  Facebook Ads
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('Google Ads')}
                >
                  Google Ads
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out bg-white dark:bg-zinc-900 border-r shadow-sm md:relative',
          sidebarCollapsed ? 'w-16 md:w-16' : 'w-64 md:w-64',
          mobileMenuOpen
            ? 'translate-x-0'
            : 'md:translate-x-0 -translate-x-full'
        )}
        aria-label="Navegação principal"
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              'p-4 flex justify-center transition-all duration-300',
              sidebarCollapsed ? 'items-center' : ''
            )}
          >
            <div className="flex flex-col items-center">
              <img
                src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
                alt="Ads-GPT Logo"
                className={cn(
                  'object-contain transition-all duration-300',
                  sidebarCollapsed ? 'h-10 w-10' : 'h-28 w-auto max-w-full'
                )}
              />
            </div>
          </div>

          <button
            className="absolute right-0 top-20 transform translate-x-1/2 bg-white dark:bg-zinc-800 border rounded-full p-1 shadow-md"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <nav className="flex-1 p-4 space-y-2" aria-label="Menu principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-primary text-white'
                        : 'hover:bg-secondary dark:hover:bg-zinc-800'
                    )
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            {!sidebarCollapsed && (
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-3 mb-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {userName || 'Usuário'}
                  </p>
                </div>
              </Link>
            )}

            {sidebarCollapsed && (
              <Link
                to="/profile"
                className="flex justify-center items-center p-3 mb-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="p-1.5 rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
              </Link>
            )}

            <div className="hidden md:flex justify-center mt-2 mb-4 gap-2">
              <NotificationButton
                notifications={notifications}
                onNotificationRead={markAsRead}
                onClearAll={clearAll}
              />
              <ThemeToggle />
            </div>

            {!sidebarCollapsed && (
              <Card className="overflow-hidden dark:bg-zinc-800">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <h4 className="text-sm font-medium">Precisa de ajuda?</h4>
                  <p className="text-xs mt-1 text-blue-100">
                    Entre em contato com nossa equipe de suporte
                  </p>
                </div>
                <div className="p-4">
                  <a
                    href="https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20Ads-GPT."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 text-sm flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contatar Suporte
                  </a>
                </div>
              </Card>
            )}

            <button
              className={cn(
                'flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mt-4 px-4 py-2 w-full',
                sidebarCollapsed ? 'justify-center' : ''
              )}
              onClick={handleLogout}
              aria-label="Sair da conta"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {!sidebarCollapsed && <span className="text-sm">Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      <main
        className={cn(
          'flex-1 overflow-auto transition-all duration-300',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-0'
        )}
      >
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b py-2 px-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-1"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span>Pesquisar...</span>
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  /
                </kbd>
              </Button>
              <KeyboardShortcuts />
            </div>
            <div className="flex items-center gap-3">
              <TokenBadge />
              <div className="hidden md:flex gap-2">
                <NotificationButton
                  notifications={notifications}
                  onNotificationRead={markAsRead}
                  onClearAll={clearAll}
                />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'p-6 max-w-7xl mx-auto',
            mounted ? 'animate-fade-in' : 'opacity-0'
          )}
        >
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>

      <div className="fixed right-6 bottom-6 z-50">
        <a
          href="https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20Ads-GPT."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 
                    bg-green-500 rounded-full shadow-lg hover:bg-green-600
                    transition-all duration-300 hover:scale-110"
        >
          <div
            className="absolute inset-0 rounded-full bg-green-500 
                          animate-ping opacity-75"
          ></div>
          <MessageCircle className="text-white h-6 w-6 z-10" />
        </a>
      </div>
    </div>
  );
};

export default Layout;
