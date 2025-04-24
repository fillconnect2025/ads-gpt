
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfile() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate('/login');
  };

  return (
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
  );
}

export function UserProfileMenu() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate('/login');
  };

  return (
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
  );
}
