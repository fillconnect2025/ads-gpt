
import * as React from "react"
import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, Users, LayoutDashboard, Plus, CheckCircle, FileText, HelpCircle, GraduationCap, MessageSquare, KanbanSquare, Package, ShoppingCart, ClipboardList, UserPlus, BarChart } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader, SidebarFooter, SidebarSeparator, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarInset, } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
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
    icon: <BarChart className="h-4 w-4" />,
    href: "/analise-ia"
  },
  {
    label: "Configurações",
    icon: <Settings className="h-4 w-4" />,
    href: "/configuracoes"
  },
];

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate a delay for loading.
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="ghost" className="w-full justify-start px-4">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{user?.email}</span>
              <span className="text-xs text-muted-foreground">
                {user?.user_metadata?.name || 'Visitante'}
              </span>
            </div>
          </Button>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </>
            ) : (
              <>
                {menuItems.map((item: MenuItemProps) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.href)} 
                      isActive={pathname === item.href}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
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
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
