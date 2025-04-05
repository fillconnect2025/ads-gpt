
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-all duration-300 ${scrollY > 10 ? 'bg-background/95 shadow-sm' : 'bg-background/80'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
          <img 
            src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png" 
            alt="Ads-GPT Logo" 
            className="h-8" 
          />
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Ads-GPT</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group">
            Recursos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#beneficios" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group">
            Benefícios
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#planos" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group">
            Planos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group">
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline" size="sm" className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md">Entrar</Button>
          </Link>
          <Link to="/registro">
            <Button size="sm" className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md group">
              Começar Agora
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
