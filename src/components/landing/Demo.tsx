
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import Sparkles from './Sparkles';

const Demo = () => {
  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Veja em Ação
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-slide-up">
            Demonstração da Plataforma
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
            Veja como o Ads-GPT pode transformar a maneira como você gerencia suas campanhas.
          </p>
        </div>
        <div className="mt-12 rounded-xl border bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 p-6 shadow-lg mx-auto max-w-4xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2 opacity-0 animate-fade-in group hover:bg-gradient-to-br hover:from-gray-50 hover:to-white dark:hover:from-zinc-800 dark:hover:to-zinc-900">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="default" size="lg" className="animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Assistir ao Vídeo
              </Button>
            </div>
            <div className="text-center p-6">
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 inline-block mb-4 animate-bounce">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Vídeo de Demonstração</h3>
              <p className="text-muted-foreground mb-4">
                Assista a um tour completo da plataforma Ads-GPT
              </p>
              <Button className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Assistir ao Vídeo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
