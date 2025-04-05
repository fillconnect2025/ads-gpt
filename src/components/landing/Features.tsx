
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  BarChart, 
  Target, 
  Zap, 
  FileText, 
  Facebook
} from 'lucide-react';
import Sparkles from './Sparkles';

const Features = () => {
  const features = [
    { 
      icon: <LayoutDashboard className="h-6 w-6" />, 
      title: "Dashboard Intuitivo", 
      description: "Visualize todos os seus dados de campanha em um único painel personalizável e fácil de usar.",
      delay: 100,
      gradient: "from-blue-500 to-cyan-400"
    },
    { 
      icon: <BarChart className="h-6 w-6" />, 
      title: "Análise Avançada", 
      description: "Insights detalhados sobre o desempenho das suas campanhas com métricas avançadas e tendências.",
      delay: 200,
      gradient: "from-green-500 to-emerald-400"
    },
    { 
      icon: <Target className="h-6 w-6" />, 
      title: "Gerenciamento de Campanhas", 
      description: "Crie, edite e gerencie todas as suas campanhas do Facebook Ads diretamente da plataforma.",
      delay: 300,
      gradient: "from-purple-500 to-indigo-500"
    },
    { 
      icon: <Zap className="h-6 w-6" />, 
      title: "Otimização por IA", 
      description: "Recomendações personalizadas para melhorar suas campanhas com base em análises de IA.",
      delay: 400,
      gradient: "from-red-500 to-rose-400"
    },
    { 
      icon: <FileText className="h-6 w-6" />, 
      title: "Relatórios Detalhados", 
      description: "Relatórios personalizáveis e exportáveis para compartilhar com sua equipe ou clientes.",
      delay: 500,
      gradient: "from-amber-400 to-yellow-300"
    },
    { 
      icon: <Facebook className="h-6 w-6" />, 
      title: "Integração com Facebook", 
      description: "Integração direta e sincronização em tempo real com sua conta do Facebook Ads.",
      delay: 600,
      gradient: "from-indigo-500 to-blue-400"
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Recursos Poderosos
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-slide-up">
            Tudo que você precisa para otimizar suas campanhas
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
            Gerencie, analise e otimize suas campanhas publicitárias com nossa plataforma completa.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className={`border shadow-md transition-all duration-300 hover:-translate-y-2 opacity-0 animate-fade-in overflow-hidden group`} style={{animationDelay: `${feature.delay}ms`}}>
              <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4 relative group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 dark:group-hover:from-zinc-900 dark:group-hover:to-zinc-800 transition-colors duration-300">
                <div className={`rounded-full bg-gradient-to-r ${feature.gradient} text-white p-3 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
