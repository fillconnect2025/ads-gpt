
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  PlusCircle, 
  X, 
  FileText, 
  FileDown, 
  GitCompare, 
  Star, 
  AlertTriangle, 
  BadgePercent, 
  BarChart2, 
  Rocket,
  Coins
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ICampaignObjective } from '@/@types/integrations.type';
import { useAiAnalysis } from '@/hooks/useAiAnalysis';
import { useTokens } from '@/context/TokenContext';
import AnalysisForm from '@/components/ai-analysis/AnalysisForm';
import AnalysisProgress from '@/components/ai-analysis/AnalysisProgress';
import AnalysisResults from '@/components/ai-analysis/AnalysisResults';
import AnalysisHistoryTable from '@/components/ai-analysis/AnalysisHistoryTable';
import TokenAlert from '@/components/TokenAlert';
import { generateMockMetrics, generateMockInsights, generateAnalysisScore } from '@/utils/ragHelpers';
import { supabase } from '@/utils/supabase';
import { trackTokenUsage } from '@/services/tokenService';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import '../utils/animations.css';

const AiAnalysis: React.FC = () => {
  const { user } = useAuth();
  const { tokens, consumeToken } = useTokens();
  const userId = user?.id || '';
  const { toast } = useToast();
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  const [selectedInsightCategory, setSelectedInsightCategory] = useState('all');
  
  const { 
    analysisList,
    selectedAnalysis,
    isLoadingAnalyses,
    isLoadingSelectedAnalysis,
    analysisProgress,
    submitAnalysis,
    selectAnalysis,
    clearSelectedAnalysis,
    submitRating,
    isSubmitting,
    refetchAnalyses
  } = useAiAnalysis({ userId });

  const campaignObjectives: ICampaignObjective[] = [
    { value: 'conversao', label: 'Conversão' },
    { value: 'leads', label: 'Geração de Leads' },
    { value: 'trafego', label: 'Tráfego' },
    { value: 'alcance', label: 'Alcance' },
    { value: 'engajamento', label: 'Engajamento' },
    { value: 'outro', label: 'Outro' },
  ];

  const insightCategories = [
    { id: 'all', label: 'Todos' },
    { id: 'creative', label: 'Criativo' },
    { id: 'targeting', label: 'Segmentação' },
    { id: 'budget', label: 'Orçamento' },
    { id: 'platform', label: 'Plataforma' },
    { id: 'competition', label: 'Concorrência' }
  ];

  useEffect(() => {
    const setupMockData = async () => {
      try {
        const { error: checkError } = await supabase.from('ads_analysis').select('id').limit(1);
        
        if (checkError && checkError.code === '42P01') {
          console.log('Setting up mock data for demonstration');
          
          const mockAnalysis = {
            id: 'mock-analysis-1',
            user_id: userId,
            campaign_name: 'Campanha Exemplo',
            start_date: '2024-04-01',
            end_date: '2024-04-15',
            objective: 'conversao',
            status: 'completed',
            metrics: generateMockMetrics(),
            insights: generateMockInsights(),
            recommendations: ['Recomendação 1', 'Recomendação 2'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            score: generateAnalysisScore()
          };
        }
      } catch (error) {
        console.error('Error setting up mock data:', error);
      }
    };

    if (userId) {
      setupMockData();
    }
  }, [userId]);

  const handleNewAnalysis = () => {
    setIsNewAnalysisOpen(true);
  };

  const handleCloseNewAnalysis = () => {
    setIsNewAnalysisOpen(false);
  };

  const handleSubmitAnalysis = (formData: any) => {
    submitAnalysis(formData);
    setIsNewAnalysisOpen(false);
    toast({
      title: "Análise iniciada",
      description: "Sua análise de campanha foi iniciada. Você será notificado quando estiver pronta."
    });
    
    // Consume token for new analysis
    consumeToken();
    trackTokenUsage('analysis');
  };
  
  const handleExportPDF = () => {
    if (tokens < 2) {
      toast({
        variant: "destructive",
        title: "Tokens insuficientes",
        description: "Você precisa de 2 tokens para exportar o relatório PDF."
      });
      return;
    }
    
    toast({
      title: "Exportando PDF",
      description: "Seu relatório está sendo gerado e será baixado em breve."
    });
    
    // Consume tokens
    consumeToken();
    consumeToken();
    trackTokenUsage('report', selectedAnalysis?.id);
    
    // Mock PDF download - in production this would connect to a real PDF generator
    setTimeout(() => {
      toast({
        title: "PDF Gerado",
        description: "Seu relatório foi gerado com sucesso."
      });
    }, 2000);
  };
  
  const handleSimulateROI = () => {
    if (tokens < 5) {
      toast({
        variant: "destructive",
        title: "Tokens insuficientes",
        description: "Você precisa de 5 tokens para simular resultados com IA."
      });
      return;
    }
    
    toast({
      title: "Simulando resultados",
      description: "Nossa IA está simulando resultados futuros com base nos dados atuais..."
    });
    
    // Consume tokens
    for (let i = 0; i < 5; i++) {
      consumeToken();
    }
    
    // Mock simulation - in production would call an AI endpoint
    setTimeout(() => {
      toast({
        title: "Simulação concluída",
        description: "Resultados de simulação disponíveis para visualização."
      });
    }, 3000);
  };
  
  const handleCompetitorBenchmark = () => {
    if (tokens < 4) {
      toast({
        variant: "destructive",
        title: "Tokens insuficientes",
        description: "Você precisa de 4 tokens para ver a comparação com concorrentes."
      });
      return;
    }
    
    toast({
      title: "Analisando concorrência",
      description: "Comparando sua campanha com benchmarks do setor..."
    });
    
    // Consume tokens
    for (let i = 0; i < 4; i++) {
      consumeToken();
    }
    
    // Mock benchmark - in production would fetch real benchmark data
    setTimeout(() => {
      toast({
        title: "Benchmark concluído",
        description: "Comparação com concorrentes disponível para visualização."
      });
    }, 2500);
  };
  
  const renderInsightCard = (title: string, description: string, impact: string, category: string, tokenCost: number = 2) => {
    return (
      <Card className={cn(
        "card-transition mb-4",
        (selectedInsightCategory === 'all' || selectedInsightCategory === category) ? 'block' : 'hidden'
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              {category === 'creative' && 'Criativo'}
              {category === 'targeting' && 'Segmentação'}
              {category === 'budget' && 'Orçamento'}
              {category === 'platform' && 'Plataforma'}
              {category === 'competition' && 'Concorrência'}
            </Badge>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <BadgePercent className="h-5 w-5 mr-2 text-amber-500" />
            <span className="text-sm font-medium">Impacto estimado: {impact}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Simular resultado
            <Badge variant="secondary" className="ml-1">{tokenCost} tokens</Badge>
          </Button>
          <Button size="sm" variant="secondary">Aplicar</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {tokens < 10 && <TokenAlert />}
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Análise I.A.</h1>
        <Button onClick={handleNewAnalysis} className="gap-2">
          <PlusCircle size={16} />
          Nova Análise
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            disabled={!selectedAnalysis}
          >
            Análise Atual
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            disabled={!selectedAnalysis || selectedAnalysis.status !== 'completed'}
          >
            Insights Estratégicos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Análises</CardTitle>
              <CardDescription>
                Veja todas as análises de campanhas realizadas pela I.A.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalysisHistoryTable
                analyses={analysisList || []}
                isLoading={isLoadingAnalyses}
                onViewAnalysis={(id) => {
                  selectAnalysis(id);
                  setActiveTab('analysis');
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          {selectedAnalysis && (
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-0 top-0" 
                onClick={clearSelectedAnalysis}
              >
                <X className="h-4 w-4 mr-1" />
                Fechar
              </Button>
              
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-bold">{selectedAnalysis.campaign_name}</h2>
                {selectedAnalysis.status === 'completed' && selectedAnalysis.score >= 80 && (
                  <Badge className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" /> Alta Performance
                  </Badge>
                )}
                {selectedAnalysis.status === 'completed' && selectedAnalysis.score < 60 && (
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Risco
                  </Badge>
                )}
                {selectedAnalysis.status === 'completed' && selectedAnalysis.score >= 60 && selectedAnalysis.score < 80 && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Média
                  </Badge>
                )}
              </div>
              
              {selectedAnalysis.status !== 'completed' ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">IA</span>
                      </div>
                      <div className="typing-animation">
                        {selectedAnalysis.status === 'collecting' && "Estou coletando dados da sua campanha para análise..."}
                        {selectedAnalysis.status === 'processing' && "Analisando métricas-chave como CPM, CTR e ROAS..."}
                        {selectedAnalysis.status === 'evaluating' && "Identificando padrões de desempenho nos dados da campanha..."}
                        {selectedAnalysis.status === 'personalizing' && "Gerando recomendações personalizadas para sua campanha..."}
                      </div>
                    </div>
                  </div>
                
                  <AnalysisProgress 
                    status={selectedAnalysis.status}
                    progress={analysisProgress}
                  />
                </div>
              ) : (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">IA</span>
                      </div>
                      <div>
                        <p className="mb-2">Análise concluída! Identifiquei {selectedAnalysis.insights.strengths.length} pontos fortes e {selectedAnalysis.insights.weaknesses.length} oportunidades de melhoria na sua campanha.</p>
                        <Button 
                          size="sm" 
                          onClick={() => setActiveTab('insights')}
                        >
                          Ver Insights Estratégicos
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="flex flex-col h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-green-500" />
                          Pontos Fortes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedAnalysis.insights.strengths.map((strength, i) => (
                            <li key={`str-${i}`} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="flex flex-col h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                          Oportunidades de Melhoria
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedAnalysis.insights.weaknesses.map((weakness, i) => (
                            <li key={`wk-${i}`} className="text-amber-700">{weakness}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                
                  <div className="flex mt-6 gap-3 flex-wrap">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={handleExportPDF}
                    >
                      <FileDown className="h-4 w-4" />
                      Exportar PDF
                      <Badge variant="secondary" className="ml-1">2 tokens</Badge>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleCompetitorBenchmark()}
                    >
                      <BarChart2 className="h-4 w-4" />
                      Ver Benchmark
                      <Badge variant="secondary" className="ml-1">4 tokens</Badge>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleSimulateROI()}
                    >
                      <Rocket className="h-4 w-4" />
                      Simular ROI Futuro
                      <Badge variant="secondary" className="ml-1">5 tokens</Badge>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          {selectedAnalysis && selectedAnalysis.status === 'completed' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">Insights Estratégicos</h2>
                  <p className="text-muted-foreground">
                    Recomendações baseadas em algoritmos de I.A. e análise de dados
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{tokens} tokens disponíveis</span>
                </div>
              </div>
              
              <div className="overflow-auto pb-3 mb-3">
                <div className="inline-flex items-center border rounded-lg p-1 bg-background">
                  {insightCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedInsightCategory === category.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedInsightCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Creative insights */}
                {renderInsightCard(
                  "Otimizar Imagens dos Anúncios", 
                  "Imagens com pessoas reais tiveram CTR 27% maior que imagens genéricas ou ilustrações.",
                  "+25-30% CTR potencial",
                  "creative",
                  2
                )}
                
                {renderInsightCard(
                  "Ajustar Copy para Chamada à Ação", 
                  "CTA diretos como 'Compre Agora' performaram melhor que CTAs indiretos.",
                  "+15% em taxa de conversão",
                  "creative",
                  2
                )}
                
                {/* Targeting insights */}
                {renderInsightCard(
                  "Refinar Segmentação por Faixa Etária", 
                  "O público de 25-34 anos tem custo por conversão 40% menor que outros segmentos.",
                  "-35% no CPA médio",
                  "targeting",
                  2
                )}
                
                {/* Budget insights */}
                {renderInsightCard(
                  "Redistribuir Orçamento por Horário", 
                  "Concentrar 60% do orçamento entre 19h e 22h pode maximizar conversões.",
                  "+22% ROAS estimado",
                  "budget",
                  3
                )}
                
                {/* Platform insights */}
                {renderInsightCard(
                  "Priorizar Anúncios em Instagram Stories", 
                  "Este formato tem desempenho 35% melhor que feed para seu tipo de produto.",
                  "+18% em engajamento",
                  "platform",
                  2
                )}
                
                {/* Competition insights */}
                {renderInsightCard(
                  "Diferenciação da Proposta de Valor", 
                  "Enfatizar garantia de devolução e entrega rápida nos anúncios.",
                  "+20% CTR vs concorrentes",
                  "competition",
                  4
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold">IA</span>
                  </div>
                  <div>
                    <p className="text-blue-800">
                      <strong>Nota da IA:</strong> As funcionalidades premium utilizam nosso algoritmo preditivo treinado com dados históricos de mais de 2.000 campanhas reais para gerar recomendações personalizadas de alta precisão.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Sheet open={isNewAnalysisOpen} onOpenChange={setIsNewAnalysisOpen}>
        <SheetContent className="sm:max-w-md md:max-w-xl">
          <SheetHeader>
            <SheetTitle>Nova Análise de Campanha</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <AnalysisForm 
              onSubmit={handleSubmitAnalysis}
              isSubmitting={isSubmitting}
              objectives={campaignObjectives}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AiAnalysis;
