
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Sparkles from './Sparkles';

const Pricing = () => {
  const plans = [
    {
      name: "Iniciante",
      price: "R$97",
      description: "Para pequenas empresas",
      features: [
        "Até 3 contas de anúncios",
        "Análise básica de campanhas",
        "Relatórios semanais",
        "Suporte por e-mail"
      ],
      popular: false,
      color: "blue",
      delay: 100,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "Profissional",
      price: "R$197",
      description: "Para empresas em crescimento",
      features: [
        "Até 10 contas de anúncios",
        "Análise avançada de campanhas",
        "Relatórios diários",
        "Suporte por WhatsApp",
        "Otimização por IA"
      ],
      popular: true,
      color: "primary",
      delay: 200,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      name: "Empresarial",
      price: "R$397",
      description: "Para agências e grandes negócios",
      features: [
        "Contas ilimitadas",
        "Análise premium de campanhas",
        "Relatórios em tempo real",
        "Gerente de conta dedicado",
        "API personalizada"
      ],
      popular: false,
      color: "purple",
      delay: 300,
      gradient: "from-indigo-500 to-blue-400"
    }
  ];

  return (
    <section id="planos" className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-indigo-950 dark:to-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Planos e Preços
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-slide-up">
            Escolha o plano ideal para o seu negócio
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
            Oferecemos opções flexíveis para atender às necessidades de empresas de todos os tamanhos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`${
                plan.popular 
                  ? 'border-primary shadow-xl relative scale-105 z-10' 
                  : 'border shadow-md'
              } transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in overflow-hidden group`}
              style={{animationDelay: `${plan.delay}ms`}}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
              )}
              <div className={`h-2 bg-gradient-to-r ${plan.gradient}`} />
              <CardContent className={`p-6 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 dark:group-hover:from-zinc-900 dark:group-hover:to-zinc-800 transition-colors duration-300 ${plan.popular ? 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10' : ''}`}>
                <div className="mb-4 space-y-2 text-center">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold flex items-center justify-center gap-1">
                    {plan.price}<span className="text-base font-normal">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="space-y-4 mt-6">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center">
                      <CheckCircle className={`h-4 w-4 text-${plan.color === 'primary' ? 'primary' : plan.color}-500 mr-2`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/registro">
                    <Button 
                      className={`w-full transition-all duration-300 hover:scale-105 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
                          : ''
                      }`}
                      variant={plan.popular ? "default" : "default"}
                    >
                      Escolher Plano
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
