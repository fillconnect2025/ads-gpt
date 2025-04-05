
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-black px-4">
      <div className="text-center max-w-md animate-scale-in">
        <div className="mb-8 flex justify-center">
          <img 
            src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png" 
            alt="Ads-GPT Logo" 
            className="h-36 w-auto max-w-full object-contain" 
          />
        </div>
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-50"></div>
          <div className="text-9xl font-bold text-primary relative">404</div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Página Não Encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Voltar ao Painel
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
