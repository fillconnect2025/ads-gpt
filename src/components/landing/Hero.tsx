import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sparkles from './Sparkles';
import Stats from './Stats';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-blue-50 to-transparent py-20 md:py-32">
      <div
        className={`container px-4 md:px-6 transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Inteligência Artificial para Otimização de Anúncios
              </span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              Análise Inteligente de{' '}
              <span className="text-primary">Campanhas</span> de Facebook Ads
            </h1>
            <p
              className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              Otimize suas campanhas publicitárias com análises profundas,
              insights acionáveis e recomendações personalizadas alimentadas por
              IA.
            </p>
            <div
              className="flex flex-col gap-2 min-[400px]:flex-row animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <Link to="/registro">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="absolute inset-0 bg-primary/10 group-hover:translate-y-full transition-transform duration-300"></span>
                  <span className="relative flex items-center">
                    Experimente Grátis
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <a href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-all duration-200 hover:bg-primary/5"
                >
                  Ver Demonstração
                </Button>
              </a>
            </div>
          </div>
          <div
            className="lg:pl-10 animate-scale-in"
            style={{ animationDelay: '400ms' }}
          >
            <div className="rounded-xl border bg-card p-2 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
                  alt="Dashboard do Ads-GPT"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
};

export default Hero;
