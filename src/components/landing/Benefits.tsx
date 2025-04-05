
import { BarChart3, Clock, Coins, MessageCircle } from 'lucide-react';
import Sparkles from './Sparkles';

const Benefits = () => {
  const benefits = [
    { 
      icon: <Clock className="h-6 w-6 text-white flex-shrink-0" />, 
      title: "Economize Tempo", 
      description: "Automatize tarefas repetitivas e foque em estratégias que realmente importam.",
      delay: 100,
      gradient: "from-blue-500 to-cyan-400"
    },
    { 
      icon: <Coins className="h-6 w-6 text-white flex-shrink-0" />, 
      title: "Aumente o ROI", 
      description: "Otimize sua distribuição de orçamento e melhore o retorno sobre o investimento.",
      delay: 200,
      gradient: "from-green-500 to-teal-400"
    },
    { 
      icon: <BarChart3 className="h-6 w-6 text-white flex-shrink-0" />, 
      title: "Decisões Baseadas em Dados", 
      description: "Tome decisões informadas com base em análises precisas e insights acionáveis.",
      delay: 300,
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <MessageCircle className="h-6 w-6 text-white flex-shrink-0" />, 
      title: "Suporte 24/7", 
      description: "Nossa equipe de especialistas está sempre disponível para ajudar você.",
      delay: 400,
      gradient: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-zinc-950 dark:to-indigo-950 relative">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Benefícios Exclusivos
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-slide-up">
            Por que escolher o <span className="text-primary">Ads-GPT</span>?
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
            Nossa plataforma oferece vantagens exclusivas para ajudar você a alcançar resultados superiores.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mt-12">
          <div className="order-2 lg:order-1 animate-slide-up">
            <img 
              src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
              alt="Benefícios do Ads-GPT" 
              className="mx-auto rounded-xl shadow-lg w-full max-w-lg transition-all duration-700 hover:shadow-xl hover:scale-105"
            />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 opacity-0 animate-fade-in" style={{animationDelay: `${benefit.delay}ms`}}>
                <div className={`p-2 rounded-full bg-gradient-to-r ${benefit.gradient} h-10 w-10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Benefits;
