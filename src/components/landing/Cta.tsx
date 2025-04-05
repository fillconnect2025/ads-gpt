
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Cta = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl animate-fade-in">
            Comece a otimizar suas campanhas hoje mesmo
          </h2>
          <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-slide-up">
            Junte-se a mais de 1.000 empresas que já aumentaram seu ROI com o Ads-GPT.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4 animate-scale-in">
            <Link to="/registro">
              <Button size="lg" variant="secondary" className="gap-1 group transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary">
                Começar Agora
                <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a 
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Ads-GPT."
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/20 transition-all duration-300 hover:scale-105 hover:bg-white/20">
                Falar com um Especialista
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
