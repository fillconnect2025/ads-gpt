
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Facebook } from 'lucide-react';
import Sparkles from './Sparkles';

const Contact = () => {
  const contactOptions = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Chat",
      description: "Converse com nossa equipe de suporte em tempo real.",
      action: "Iniciar Chat",
      url: "https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20Ads-GPT.",
      color: "green",
      delay: 100,
      gradient: "from-green-500 to-teal-400"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentação",
      description: "Explore nossos guias e tutoriais detalhados.",
      action: "Ver Documentação",
      url: "#",
      color: "blue",
      delay: 200,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Facebook className="h-6 w-6" />,
      title: "Siga-nos",
      description: "Acompanhe nossas novidades e atualizações nas redes sociais.",
      action: "Nossas Redes",
      url: "#",
      color: "indigo",
      delay: 300,
      gradient: "from-indigo-500 to-blue-400",
      showSocials: true
    }
  ];

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Fale Conosco
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-slide-up">
            Tem alguma dúvida?
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
            Nossa equipe está pronta para ajudar você a começar a usar o Ads-GPT.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {contactOptions.map((contact, index) => (
            <Card key={index} className={`border shadow-md transition-all duration-300 hover:-translate-y-2 opacity-0 animate-fade-in group ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''} overflow-hidden hover:shadow-lg`} style={{animationDelay: `${contact.delay}ms`}}>
              <div className={`h-2 bg-gradient-to-r ${contact.gradient}`} />
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 dark:group-hover:from-zinc-900 dark:group-hover:to-zinc-800 transition-colors duration-300">
                <div className={`rounded-full bg-gradient-to-r ${contact.gradient} text-white p-3 transition-transform duration-300 hover:scale-110`}>
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold">{contact.title}</h3>
                <p className="text-muted-foreground">
                  {contact.description}
                </p>
                {contact.showSocials ? (
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full transition-transform duration-300 hover:scale-110 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full transition-transform duration-300 hover:scale-110 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-900/30 dark:hover:text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full transition-transform duration-300 hover:scale-110 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-900/30 dark:hover:text-sky-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </Button>
                  </div>
                ) : (
                  <a 
                    href={contact.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-transform duration-300 hover:scale-105 bg-gradient-to-r ${contact.gradient} text-white hover:shadow-md`}
                  >
                    {contact.action}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
