
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight, HelpCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  name: string;
  lite: boolean | string;
  plus: boolean | string;
  prime: boolean | string;
  tooltip?: string;
}

const PlanFeatures: PlanFeature[] = [
  {
    name: 'Tokens mensais',
    lite: '100',
    plus: '500',
    prime: '2000',
    tooltip: 'Tokens são usados para gerar conteúdo. Recarregam todo mês.'
  },
  {
    name: 'Campanhas simultâneas',
    lite: '2',
    plus: '10',
    prime: 'Ilimitado'
  },
  {
    name: 'Integrações',
    lite: '1',
    plus: '3',
    prime: 'Todas disponíveis'
  },
  {
    name: 'Relatórios avançados',
    lite: false,
    plus: true,
    prime: true,
    tooltip: 'Acesse métricas detalhadas de desempenho'
  },
  {
    name: 'Suporte prioritário',
    lite: false,
    plus: false,
    prime: true
  },
  {
    name: 'Exportação de dados',
    lite: false,
    plus: true,
    prime: true
  },
  {
    name: 'API dedicada',
    lite: false,
    plus: false,
    prime: true,
    tooltip: 'Acesso à API para integração com outros sistemas'
  },
  {
    name: 'Usuários adicionais',
    lite: '1',
    plus: '3',
    prime: '10'
  }
];

const Plans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { toast } = useToast();

  const handleUpgrade = (plan: string) => {
    toast({
      title: "Upgrade solicitado",
      description: `Você selecionou o plano ${plan}. Em breve você será direcionado para o pagamento.`,
    });
  };

  const PlanCard = ({ title, price, description, badge, features, buttonText, isPrimary = false }: {
    title: string;
    price: number;
    description: string;
    badge?: string;
    features: string[];
    buttonText: string;
    isPrimary?: boolean;
  }) => {
    const displayPrice = isAnnual ? Math.floor(price * 0.8) : price;
    const savePercent = 20;
    
    return (
      <Card className={`w-full flex flex-col ${isPrimary ? 'border-primary shadow-lg' : ''}`}>
        <CardHeader className={isPrimary ? 'bg-primary/5' : ''}>
          {badge && (
            <Badge variant="outline" className="w-fit mb-2 bg-primary/10">{badge}</Badge>
          )}
          <CardTitle className="flex items-center justify-between">
            {title}
          </CardTitle>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">R${displayPrice}</span>
            <span className="text-muted-foreground mb-1">/mês</span>
          </div>
          {isAnnual && (
            <span className="text-xs text-green-600 font-medium">
              Economize {savePercent}% com o plano anual
            </span>
          )}
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            variant={isPrimary ? "default" : "outline"} 
            className="w-full mt-2"
            onClick={() => handleUpgrade(title)}
          >
            {buttonText}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Escolha seu plano</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Selecione o plano que melhor atende às suas necessidades e comece a otimizar suas campanhas agora mesmo.
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 my-6">
        <span className={!isAnnual ? "font-medium" : "text-muted-foreground"}>Mensal</span>
        <Switch 
          checked={isAnnual} 
          onCheckedChange={setIsAnnual} 
          id="billing-toggle"
          aria-label="Alternar entre cobrança mensal e anual"
        />
        <Label 
          htmlFor="billing-toggle" 
          className={isAnnual ? "font-medium" : "text-muted-foreground"}
        >
          Anual
        </Label>
        {isAnnual && (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
            Economize 20%
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlanCard
          title="Lite"
          price={49}
          description="Perfeito para iniciantes que querem experimentar a plataforma."
          features={[
            "100 tokens por mês",
            "2 campanhas simultâneas",
            "1 integração",
            "1 usuário",
            "Suporte por e-mail"
          ]}
          buttonText="Comece agora"
        />
        <PlanCard
          title="Plus"
          price={99}
          description="Ideal para empresas que desejam escalar suas campanhas."
          badge="Mais popular"
          features={[
            "500 tokens por mês",
            "10 campanhas simultâneas",
            "3 integrações",
            "Relatórios avançados",
            "Exportação de dados",
            "3 usuários",
            "Suporte por chat"
          ]}
          buttonText="Faça upgrade"
          isPrimary={true}
        />
        <PlanCard
          title="Prime"
          price={199}
          description="Solução completa para agências e equipes maiores."
          features={[
            "2000 tokens por mês",
            "Campanhas ilimitadas",
            "Todas as integrações",
            "Relatórios avançados",
            "Suporte prioritário",
            "API dedicada",
            "10 usuários",
            "Suporte personalizado"
          ]}
          buttonText="Contate vendas"
        />
      </div>

      <Tabs defaultValue="features" className="mt-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="features">Comparativo detalhado</TabsTrigger>
          <TabsTrigger value="faq">Perguntas frequentes</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Recursos</th>
                      <th className="text-center py-3 px-4">Lite</th>
                      <th className="text-center py-3 px-4">Plus</th>
                      <th className="text-center py-3 px-4">Prime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PlanFeatures.map((feature, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20">
                        <td className="py-3 px-4 text-sm flex items-center">
                          {feature.name}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-sm">{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {feature.lite === true ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : feature.lite === false ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            feature.lite
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {feature.plus === true ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : feature.plus === false ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            feature.plus
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {feature.prime === true ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : feature.prime === false ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            feature.prime
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como os tokens funcionam?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tokens são a unidade de medida para o uso da plataforma. Cada ação que utiliza IA consume uma quantidade específica de tokens. Todos os planos incluem uma quantidade mensal de tokens que se renovam automaticamente a cada ciclo de faturamento.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso mudar de plano a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sim! Você pode fazer upgrade a qualquer momento, e o valor será calculado proporcionalmente ao tempo restante do seu período atual. Para downgrade, a mudança ocorrerá no próximo ciclo de faturamento.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O que acontece se acabarem meus tokens?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Você pode comprar pacotes adicionais de tokens ou fazer upgrade para um plano superior. Você receberá notificações quando estiver prestes a atingir o limite do seu plano.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qual é a política de reembolso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Oferecemos garantia de satisfação de 14 dias. Se você não estiver satisfeito com nosso serviço, entre em contato com o suporte para solicitar um reembolso completo dentro desse período.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Precisa de mais recursos?</h2>
        <p className="mb-4">Entre em contato com nossa equipe de vendas para um plano personalizado que atenda às necessidades específicas da sua empresa.</p>
        <Button variant="outline">Contate nossa equipe</Button>
      </div>
    </div>
  );
};

export default Plans;
