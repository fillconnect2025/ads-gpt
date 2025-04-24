
import * as React from "react"
import { useNavigate } from 'react-router-dom';
import { BarChart2, Home, Settings, Users, ShoppingCart, ClipboardList } from "lucide-react"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"

const menuItems = [
  {
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: "/dashboard"
  },
  {
    label: "Clientes",
    icon: <Users className="h-4 w-4" />,
    href: "/clientes"
  },
  {
    label: "Financeiro",
    icon: <ShoppingCart className="h-4 w-4" />,
    href: "/financeiro"
  },
  {
    label: "Projetos",
    icon: <ClipboardList className="h-4 w-4" />,
    href: "/projetos"
  },
  {
    label: "Análise I.A.",
    icon: <BarChart2 className="h-4 w-4" />,
    href: "/analise-ia"
  },
  {
    label: "Configurações",
    icon: <Settings className="h-4 w-4" />,
    href: "/configuracoes"
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <Button variant="ghost" className="w-full justify-start px-4">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user?.email}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.user_metadata?.name || 'Usuário'}
                </span>
              </div>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={() => navigate(item.href)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full">
                  Minha conta
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutAndNavigate}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
