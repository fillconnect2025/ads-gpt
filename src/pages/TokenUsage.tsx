
import React from 'react';
import { useTokens } from '@/context/TokenContext';
import { getTokenUsageHistory } from '@/services/tokenService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BarChart2, Calendar, Coins, PieChart as PieChartIcon, ArrowUpRight } from 'lucide-react';
import { format, parseISO, subDays, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const TokenUsage = () => {
  const { tokens, usedTokens, plan } = useTokens();
  const usageHistory = getTokenUsageHistory();
  const { toast } = useToast();
  
  // Format dates and group usage by day
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();
  
  // Process report usage data by day
  const reportsByDay = last7Days.map(day => {
    return {
      date: day,
      count: usageHistory.reports.filter(report => {
        const reportDate = format(parseISO(report.timestamp), 'yyyy-MM-dd');
        return reportDate === day;
      }).length
    };
  });
  
  // Calculate plan limits
  const maxTokens = getPlanMaxTokens(plan);
  const usagePercentage = Math.min(100, (usedTokens / maxTokens) * 100);
  
  // Calculate token distribution
  const reportTokens = usageHistory.reports.length * 5; // Estimativa: cada relatório usa 5 tokens
  const analysisTokens = usageHistory.analysis.length * 10; // Estimativa: cada análise usa 10 tokens
  const otherTokens = usedTokens - reportTokens - analysisTokens;
  
  // Distribuição por tipo
  const distributionData = [
    { name: 'Relatórios', value: reportTokens },
    { name: 'Análises', value: analysisTokens },
    { name: 'Outros', value: Math.max(0, otherTokens) },
  ];
  
  // Uso diário (simulado)
  const dailyUsage = last7Days.map((day, index) => {
    const baseValue = Math.floor(Math.random() * 50) + 20;
    return {
      name: format(parseISO(day), 'dd/MM', { locale: ptBR }),
      relatórios: baseValue,
      análises: Math.floor(baseValue * 0.7),
      outros: Math.floor(baseValue * 0.3),
    };
  });
  
  // Projeção de uso (simulado para os próximos 5 dias)
  const today = new Date();
  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const isProjection = i > 6;
    const value = isProjection 
      ? Math.floor((usedTokens / 7) * (i - 6) + usedTokens)
      : Math.floor(usedTokens * ((7 - i) / 7));
      
    return {
      name: format(date, 'dd/MM'),
      tokens: value,
      isProjection
    };
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Seus dados de uso de tokens foram exportados para Excel"
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Uso de Tokens</h1>
          <p className="text-muted-foreground mt-1">Acompanhe e gerencie seus tokens no plano {planDisplayName[plan]}</p>
        </div>
        <Button onClick={handleExportData} variant="outline">Exportar dados</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Tokens */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Coins className="mr-2 h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Tokens Disponíveis</h3>
              </div>
              <span className="text-2xl font-bold">{tokens}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{usedTokens} usados</span>
              <span>{maxTokens} total</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Used Tokens */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Tokens Utilizados</h3>
              </div>
              <span className="text-2xl font-bold">{usedTokens}</span>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Relatórios</span>
                <span>{reportTokens}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Análises</span>
                <span>{analysisTokens}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Outros</span>
                <span>{otherTokens > 0 ? otherTokens : 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Current Plan */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Plano Atual</h3>
              </div>
              <span className="text-lg font-bold capitalize">{planDisplayName[plan]}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {maxTokens} tokens mensais
            </div>
            <div className="mt-4">
              <a 
                href="/plans" 
                className="text-sm text-primary hover:underline"
              >
                Mudar plano →
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Next Renewal */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="font-medium">Próxima Renovação</h3>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {format(addMonthToToday(), 'dd/MM/yyyy')}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Seus tokens serão renovados automaticamente
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} tokens`, 'Quantidade']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Usage Projection */}
        <Card>
          <CardHeader>
            <CardTitle>Projeção de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                    formatter={(value, name, props) => {
                      return [`${value} tokens`, props.payload.isProjection ? 'Projeção' : 'Uso real'];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tokens"
                    name="Uso de tokens"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      // Diferenciar pontos reais vs projetados
                      if (payload.isProjection) {
                        return (
                          <svg x={cx - 5} y={cy - 5} width={10} height={10}>
                            <circle cx={5} cy={5} r={5} fill="#8884d8" fillOpacity={0.4} />
                          </svg>
                        );
                      }
                      return (
                        <svg x={cx - 5} y={cy - 5} width={10} height={10}>
                          <circle cx={5} cy={5} r={5} fill="#8884d8" />
                        </svg>
                      );
                    }}
                  />
                  {/* Linha de limite */}
                  <Line
                    type="monotone"
                    dataKey={() => maxTokens}
                    name="Limite do plano"
                    stroke="#ff7300"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Daily Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Uso Diário por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyUsage}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                />
                <Legend />
                <Bar dataKey="relatórios" stackId="a" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="análises" stackId="a" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outros" stackId="a" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Atividades Recentes</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            Ver todas <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usageHistory.reports.slice(0, 5).map((report, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <div className="flex items-center">
                  <FileIcon className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Relatório gerado</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(parseISO(report.timestamp), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                </div>
              </div>
            ))}
            
            {usageHistory.reports.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                Nenhuma atividade recente
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
function getPlanMaxTokens(plan: 'lite' | 'plus' | 'prime'): number {
  switch (plan) {
    case 'lite': return 100;
    case 'plus': return 500;
    case 'prime': return 2000;
    default: return 100;
  }
}

const planDisplayName = {
  'lite': 'Lite',
  'plus': 'Plus',
  'prime': 'Prime'
};

// Função corrigida para adicionar um mês à data atual
function addMonthToToday() {
  const today = new Date();
  return addMonths(today, 1);
}

const FileIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export default TokenUsage;
