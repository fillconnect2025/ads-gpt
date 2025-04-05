
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart, Target, TrendingUp, Users, MousePointer, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import TokenAlert from "@/components/TokenAlert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  BarChart as ReChartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Dados simulados
const campaignPerformance = [
  { name: 'Jan', impressions: 4000, clicks: 2400, conversions: 800 },
  { name: 'Fev', impressions: 3000, clicks: 1398, conversions: 500 },
  { name: 'Mar', impressions: 2000, clicks: 9800, conversions: 1200 },
  { name: 'Abr', impressions: 2780, clicks: 3908, conversions: 900 },
  { name: 'Mai', impressions: 1890, clicks: 4800, conversions: 1100 },
  { name: 'Jun', impressions: 2390, clicks: 3800, conversions: 950 },
  { name: 'Jul', impressions: 3490, clicks: 4300, conversions: 1300 },
];

const adSpend = [
  { name: 'Seg', amount: 500 },
  { name: 'Ter', amount: 680 },
  { name: 'Qua', amount: 790 },
  { name: 'Qui', amount: 890 },
  { name: 'Sex', amount: 1100 },
  { name: 'Sáb', amount: 1200 },
  { name: 'Dom', amount: 1380 },
];

const audienceData = [
  { name: 'Homens 18-24', value: 400 },
  { name: 'Homens 25-34', value: 300 },
  { name: 'Homens 35-44', value: 200 },
  { name: 'Mulheres 18-24', value: 278 },
  { name: 'Mulheres 25-34', value: 189 },
  { name: 'Mulheres 35-44', value: 239 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const statsCards = [
  { 
    title: 'Total de Impressões', 
    value: '1,43M', 
    change: '+12,5%', 
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  { 
    title: 'Taxa de Cliques', 
    value: '3,2%', 
    change: '+0,8%', 
    trend: 'up',
    icon: MousePointer,
    color: 'green'
  },
  { 
    title: 'Taxa de Conversão', 
    value: '1,8%', 
    change: '-0,3%', 
    trend: 'down',
    icon: BarChart,
    color: 'yellow'
  },
  { 
    title: 'Custo por Conversão', 
    value: 'R$24,80', 
    change: '-R$1,40', 
    trend: 'up',
    icon: DollarSign,
    color: 'red'
  },
];

const dashboardTemplates = [
  { id: 'padrao', name: 'Padrão', description: 'Layout padrão com todos os componentes' },
  { id: 'desempenho', name: 'Desempenho', description: 'Foco em métricas de desempenho das campanhas' },
  { id: 'conversao', name: 'Conversão', description: 'Foco em taxas de conversão e ROI' },
  { id: 'audiencia', name: 'Audiência', description: 'Foco na análise demográfica da audiência' },
  { id: 'personalizado', name: 'Personalizado', description: 'Escolha quais componentes deseja exibir' }
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const colorClass = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  }[color];

  return (
    <Card className="card-transition overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className={cn("text-2xl font-bold mt-1", colorClass)}>{value}</h3>
          </div>
          <div className={cn(
            "p-2 rounded-full", 
            colorClass === 'text-blue-600' ? 'bg-blue-100' : 
            colorClass === 'text-green-600' ? 'bg-green-100' : 
            colorClass === 'text-yellow-600' ? 'bg-yellow-100' : 
            'bg-red-100'
          )}>
            <Icon className={cn("h-5 w-5", colorClass)} />
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div className={cn(
            "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
            isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
          )}>
            <TrendIcon className="h-3 w-3 mr-1" />
            <span>{change}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-2">vs período anterior</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Bem-vindo de volta!",
      description: "Aqui está um resumo das suas campanhas e métricas.",
    });
  }, [toast]);

  const [selectedTemplate, setSelectedTemplate] = useState('padrao');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  
  const [visibleComponents, setVisibleComponents] = useState({
    stats: true,
    performance: true,
    adSpend: true,
    insights: true,
    audience: true
  });

  const toggleComponent = (component: keyof typeof visibleComponents) => {
    setVisibleComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const shouldShowComponent = (component: string) => {
    if (selectedTemplate === 'personalizado') {
      return visibleComponents[component as keyof typeof visibleComponents];
    }
    
    if (selectedTemplate === 'desempenho') {
      return ['stats', 'performance', 'adSpend'].includes(component);
    }
    
    if (selectedTemplate === 'conversao') {
      return ['stats', 'performance', 'insights'].includes(component);
    }
    
    if (selectedTemplate === 'audiencia') {
      return ['stats', 'audience', 'insights'].includes(component);
    }
    
    return true;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button variant="outline">Exportar Relatório</Button>
      </div>

      <TokenAlert />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section-transition">
        {shouldShowComponent('performance') && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Desempenho da Campanha</CardTitle>
              <CardDescription>Visão geral de métricas em todas as campanhas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartsBarChart
                    data={campaignPerformance}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="impressions" name="Impressões" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicks" name="Cliques" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="conversions" name="Conversões" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </ReChartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {shouldShowComponent('adSpend') && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Gastos com Anúncios</CardTitle>
              <CardDescription>Despesas diárias com publicidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={adSpend}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                      }} 
                      formatter={(value: any) => [`R$${value}`, 'Valor']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Gastos com Anúncios" 
                      stroke="#1877F2" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 section-transition">
        {shouldShowComponent('insights') && (
          <Card className="overflow-hidden lg:col-span-2">
            <CardHeader>
              <CardTitle>Insights de IA</CardTitle>
              <CardDescription>Recomendações e análises baseadas em IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Otimização da Taxa de Conversão</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Com base em nossa análise, aumentar o orçamento da campanha "Coleção de Verão" em 20% pode melhorar sua taxa de conversão em aproximadamente 15% com base nas tendências de desempenho atuais.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900">Insights de Audiência</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Seus anúncios estão com desempenho 32% melhor com o segmento feminino de 25-34 anos. Considere ajustar sua segmentação para focar mais nesse grupo ou criar conteúdo especializado para elas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900">Desempenho de Criativos</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Anúncios em vídeo estão superando imagens estáticas em 45% nas métricas de engajamento. Recomendamos deslocar mais orçamento para campanhas baseadas em vídeo para melhores resultados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {shouldShowComponent('audience') && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Demografia da Audiência</CardTitle>
              <CardDescription>Distribuição de segmentos de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                      }} 
                      formatter={(value: any) => [value, 'Usuários']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
