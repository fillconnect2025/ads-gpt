
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routeNameMap: Record<string, string> = {
  'dashboard': 'Dashboard',
  'campaign-management': 'Gerenciar Campanhas',
  'campaign-analysis': 'Análise de Campanhas',
  'reports': 'Relatórios',
  'integration': 'Integração',
  'plans': 'Planos',
  'help': 'Ajuda',
  'settings': 'Configurações',
  'profile': 'Perfil',
  'token-usage': 'Uso de Tokens',
  'ad-accounts': 'Contas de Anúncios',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = routeNameMap[path] || path;

          return (
            <span key={path} data-lov-id={`breadcrumb-${path}`} className="flex gap-2 items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
