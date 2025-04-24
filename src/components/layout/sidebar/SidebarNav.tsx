
import { useNavigate } from 'react-router-dom';
import { BarChart2, Home, Settings, Users, ShoppingCart, ClipboardList } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

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

export function SidebarNav() {
  const navigate = useNavigate();

  return (
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
  );
}
