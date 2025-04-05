
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { addDays, format, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CampaignAnalysis = () => {
  // Estado para armazenar o período selecionado
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  // Estados para os filtros
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>(['todas']);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string>('todas');
  const [selectedMetric, setSelectedMetric] = useState<string>('impressoes');
  const [chartType, setChartType] = useState<string>('linha');
  const [comparisonEnabled, setComparisonEnabled] = useState<boolean>(false);
  const [comparisonDateRange, setComparisonDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 60),
    to: subDays(new Date(), 31),
  });

  // Simulação de dados de campanhas
  const campanhas = [
    { id: 1, nome: "Campanha de Verão 2023", plataforma: "facebook" },
    { id: 2, nome: "Black Friday - Produtos Eletrônicos", plataforma: "instagram" },
    { id: 3, nome: "Promoção de Páscoa", plataforma: "facebook" },
    { id: 4, nome: "Lançamento de Produto", plataforma: "instagram" },
  ];

  // Simulação de dados de métricas
  const gerarDadosMetricas = (dias: number, min: number, max: number, tendencia: 'crescente' | 'decrescente' | 'estavel' = 'estavel') => {
    const data = [];
    let ultimoValor = Math.floor(Math.random() * (max - min + 1)) + min;
    
    for (let i = 0; i < dias; i++) {
      let variacao = Math.random() * 0.2; // Variação de até 20%
      
      if (tendencia === 'crescente') {
        ultimoValor = ultimoValor * (1 + variacao);
      } else if (tendencia === 'decrescente') {
        ultimoValor = ultimoValor * (1 - variacao);
      } else {
        ultimoValor = ultimoValor * (1 + (Math.random() > 0.5 ? variacao : -variacao));
      }
      
      data.push(Math.round(ultimoValor));
    }
    
    return data;
  };

  // Gerar labels para os gráficos com base no período selecionado
  const gerarLabels = (dateRange: DateRange) => {
    if (!dateRange.from || !dateRange.to) return [];
    
    const labels = [];
    let currentDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    
    while (currentDate <= endDate) {
      labels.push(format(currentDate, 'dd/MM', { locale: pt }));
      currentDate = addDays(currentDate, 1);
    }
    
    return labels;
  };

  // Dados do gráfico principal
  const [chartData, setChartData] = useState<any>(null);
  
  // Atualizar dados do gráfico quando os filtros mudarem
  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;
    
    const days = Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const labels = gerarLabels(dateRange);
    
    let datasets = [];
    
    // Dados do período selecionado
    datasets.push({
      label: 'Período atual',
      data: gerarDadosMetricas(days, 100, 1000, 'crescente'),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    });
    
    // Adicionar dados de comparação se habilitado
    if (comparisonEnabled && comparisonDateRange?.from && comparisonDateRange?.to) {
      const comparisonDays = Math.round(
        (comparisonDateRange.to.getTime() - comparisonDateRange.from.getTime()) / 
        (1000 * 60 * 60 * 24)
      ) + 1;
      
      if (comparisonDays === days) {
        datasets.push({
          label: 'Período anterior',
          data: gerarDadosMetricas(days, 50, 800, 'estavel'),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        });
      }
    }
    
    setChartData({
      labels,
      datasets,
    });
  }, [dateRange, selectedMetric, comparisonEnabled, comparisonDateRange, chartType]);
  
  // Opções para os gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedMetric === 'impressoes' ? 'Impressões' : 
               selectedMetric === 'cliques' ? 'Cliques' : 
               selectedMetric === 'conversoes' ? 'Conversões' : 
               selectedMetric === 'ctr' ? 'CTR' : 'CPC'} ao longo do tempo`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Dados para o gráfico de pizza
  const pieData = {
    labels: ['Facebook', 'Instagram'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Métricas de resumo
  const metricas = {
    impressoes: 254789,
    cliques: 12543,
    conversoes: 347,
    ctr: 4.92,
    cpc: 0.87,
  };

  // Renderizar o gráfico conforme o tipo selecionado
  const renderChart = () => {
    if (!chartData) return null;
    
    switch (chartType) {
      case 'linha':
        return <Line data={chartData} options={chartOptions} height={300} />;
      case 'barra':
        return <Bar data={chartData} options={chartOptions} height={300} />;
      case 'pizza':
        return <Pie data={pieData} height={300} />;
      default:
        return <Line data={chartData} options={chartOptions} height={300} />;
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Análise de Campanhas</h1>
      
      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Personalize sua análise selecionando os filtros abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <DateRangePicker 
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                placeholder="Selecione um período"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Plataforma</Label>
              <Select value={selectedPlatforms} onValueChange={setSelectedPlatforms}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as plataformas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todas">Todas as plataformas</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Campanha</Label>
              <Select defaultValue="todas">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as campanhas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todas">Todas as campanhas</SelectItem>
                    {campanhas.map(campanha => (
                      <SelectItem key={campanha.id} value={String(campanha.id)}>
                        {campanha.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Métrica</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a métrica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="impressoes">Impressões</SelectItem>
                    <SelectItem value="cliques">Cliques</SelectItem>
                    <SelectItem value="conversoes">Conversões</SelectItem>
                    <SelectItem value="ctr">CTR (%)</SelectItem>
                    <SelectItem value="cpc">CPC (R$)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Opções avançadas */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={comparisonEnabled}
                    onChange={(e) => setComparisonEnabled(e.target.checked)}
                    className="mr-2"
                  />
                  Comparar com período anterior
                </Label>
              </div>
              
              {comparisonEnabled && (
                <div className="w-full md:w-auto">
                  <DateRangePicker 
                    dateRange={comparisonDateRange}
                    onDateRangeChange={setComparisonDateRange}
                    placeholder="Período de comparação"
                    label="Período para comparação"
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2 ml-auto">
                <Label>Tipo de gráfico:</Label>
                <div className="flex rounded-md border overflow-hidden">
                  <Button 
                    variant={chartType === "linha" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("linha")}
                    className="rounded-none border-0"
                  >
                    <LineChart className="h-4 w-4 mr-1" /> Linha
                  </Button>
                  <Button 
                    variant={chartType === "barra" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("barra")}
                    className="rounded-none border-0 border-x"
                  >
                    <BarChart className="h-4 w-4 mr-1" /> Barra
                  </Button>
                  <Button 
                    variant={chartType === "pizza" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("pizza")}
                    className="rounded-none border-0"
                  >
                    <PieChart className="h-4 w-4 mr-1" /> Pizza
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Cartões de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Impressões</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{metricas.impressoes.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+12.5% em relação ao período anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cliques</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{metricas.cliques.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+8.3% em relação ao período anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversões</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{metricas.conversoes.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+15.7% em relação ao período anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">CTR</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{metricas.ctr.toFixed(2)}%</div>
            <div className="text-xs text-red-600 mt-1">-2.1% em relação ao período anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPC Médio</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">R$ {metricas.cpc.toFixed(2)}</div>
            <div className="text-xs text-green-600 mt-1">+5.2% em relação ao período anterior</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico principal */}
      <Card className="h-[450px]">
        <CardHeader>
          <CardTitle>Evolução no Tempo</CardTitle>
          <CardDescription>
            {selectedMetric === 'impressoes' ? 'Impressões' : 
             selectedMetric === 'cliques' ? 'Cliques' : 
             selectedMetric === 'conversoes' ? 'Conversões' : 
             selectedMetric === 'ctr' ? 'CTR (%)' : 'CPC (R$)'} 
             ao longo do período selecionado
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          {renderChart()}
        </CardContent>
      </Card>
      
      {/* Tabs de análises detalhadas */}
      <Tabs defaultValue="por-plataforma">
        <TabsList className="mb-4">
          <TabsTrigger value="por-plataforma">Por Plataforma</TabsTrigger>
          <TabsTrigger value="por-campanha">Por Campanha</TabsTrigger>
          <TabsTrigger value="por-dia-semana">Por Dia da Semana</TabsTrigger>
          <TabsTrigger value="por-horario">Por Horário</TabsTrigger>
        </TabsList>
        
        <TabsContent value="por-plataforma">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Plataforma</CardTitle>
                <CardDescription>
                  Comparação de desempenho entre as diferentes plataformas
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <Pie data={pieData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Métricas Detalhadas</CardTitle>
                <CardDescription>
                  Comparação de todas as métricas por plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th scope="col" className="px-4 py-3">Plataforma</th>
                        <th scope="col" className="px-4 py-3">Impressões</th>
                        <th scope="col" className="px-4 py-3">Cliques</th>
                        <th scope="col" className="px-4 py-3">CTR</th>
                        <th scope="col" className="px-4 py-3">CPC</th>
                        <th scope="col" className="px-4 py-3">Conversões</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-4 font-medium">Facebook</td>
                        <td className="px-4 py-4">165,640</td>
                        <td className="px-4 py-4">8,152</td>
                        <td className="px-4 py-4">4.92%</td>
                        <td className="px-4 py-4">R$ 0.78</td>
                        <td className="px-4 py-4">224</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-medium">Instagram</td>
                        <td className="px-4 py-4">89,128</td>
                        <td className="px-4 py-4">4,391</td>
                        <td className="px-4 py-4">4.93%</td>
                        <td className="px-4 py-4">R$ 1.12</td>
                        <td className="px-4 py-4">123</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="por-campanha">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Campanha</CardTitle>
              <CardDescription>
                Comparação de desempenho entre as diferentes campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-4 py-3">Campanha</th>
                      <th scope="col" className="px-4 py-3">Plataforma</th>
                      <th scope="col" className="px-4 py-3">Impressões</th>
                      <th scope="col" className="px-4 py-3">Cliques</th>
                      <th scope="col" className="px-4 py-3">CTR</th>
                      <th scope="col" className="px-4 py-3">CPC</th>
                      <th scope="col" className="px-4 py-3">Conversões</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campanhas.map((campanha) => (
                      <tr key={campanha.id} className="border-b">
                        <td className="px-4 py-4 font-medium">{campanha.nome}</td>
                        <td className="px-4 py-4 capitalize">{campanha.plataforma}</td>
                        <td className="px-4 py-4">{Math.floor(Math.random() * 100000).toLocaleString()}</td>
                        <td className="px-4 py-4">{Math.floor(Math.random() * 5000).toLocaleString()}</td>
                        <td className="px-4 py-4">{(Math.random() * 5 + 2).toFixed(2)}%</td>
                        <td className="px-4 py-4">R$ {(Math.random() * 1.5 + 0.5).toFixed(2)}</td>
                        <td className="px-4 py-4">{Math.floor(Math.random() * 200)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="por-dia-semana">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Dia da Semana</CardTitle>
              <CardDescription>
                Análise de desempenho segmentada por dia da semana
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Bar 
                data={{
                  labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                  datasets: [
                    {
                      label: 'Cliques',
                      data: [1870, 1650, 1890, 2100, 2340, 1950, 1720],
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                      label: 'Conversões',
                      data: [42, 38, 45, 56, 68, 52, 46],
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Desempenho por dia da semana',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="por-horario">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Horário</CardTitle>
              <CardDescription>
                Análise de desempenho segmentada por horário do dia
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Line 
                data={{
                  labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
                  datasets: [
                    {
                      label: 'Cliques',
                      data: [120, 80, 50, 90, 350, 680, 740, 790, 850, 920, 760, 410],
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                      label: 'Conversões',
                      data: [3, 2, 1, 2, 8, 15, 18, 20, 24, 26, 19, 10],
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Desempenho por horário do dia',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignAnalysis;
