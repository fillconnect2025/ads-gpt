
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ICampaignObjective } from '@/@types/integrations.type';
import { useAiAnalysis } from '@/hooks/useAiAnalysis';
import AnalysisForm from '@/components/ai-analysis/AnalysisForm';
import AnalysisProgress from '@/components/ai-analysis/AnalysisProgress';
import AnalysisResults from '@/components/ai-analysis/AnalysisResults';
import AnalysisHistoryTable from '@/components/ai-analysis/AnalysisHistoryTable';
import { generateMockMetrics, generateMockInsights, generateAnalysisScore } from '@/utils/ragHelpers';
import { supabase } from '@/utils/supabase';

const AiAnalysis: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id || '';
  const { toast } = useToast();
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  
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

  // Define campaign objectives
  const campaignObjectives: ICampaignObjective[] = [
    { value: 'conversao', label: 'Conversão' },
    { value: 'leads', label: 'Geração de Leads' },
    { value: 'trafego', label: 'Tráfego' },
    { value: 'alcance', label: 'Alcance' },
    { value: 'engajamento', label: 'Engajamento' },
    { value: 'outro', label: 'Outro' },
  ];

  // Mock data setup - in a real application, this would come from the backend
  useEffect(() => {
    // This is just for demonstration purposes
    // In a real app, this would be handled by the backend
    const setupMockData = async () => {
      try {
        // Check if we already have the table
        const { error: checkError } = await supabase.from('ads_analysis').select('id').limit(1);
        
        if (checkError && checkError.code === '42P01') {
          console.log('Setting up mock data for demonstration');
          
          // In a real app, we'd create proper tables via migrations
          // This is just for demo purposes
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
          
          // In a real app, this would be done through proper migrations
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
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Análise I.A.</h1>
        <Button onClick={handleNewAnalysis} className="gap-2">
          <PlusCircle size={16} />
          Nova Análise
        </Button>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Histórico de Análises</TabsTrigger>
          <TabsTrigger value="active" disabled={!selectedAnalysis}>
            Análise Atual
          </TabsTrigger>
          <TabsTrigger value="insights" disabled={!selectedAnalysis || selectedAnalysis.status !== 'completed'}>
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
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
                onViewAnalysis={selectAnalysis}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
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
              
              {selectedAnalysis.status !== 'completed' ? (
                <AnalysisProgress 
                  status={selectedAnalysis.status}
                  progress={analysisProgress}
                />
              ) : (
                <AnalysisResults 
                  analysis={selectedAnalysis}
                  onSubmitRating={submitRating}
                />
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          {selectedAnalysis && selectedAnalysis.status === 'completed' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recomendações Estratégicas</CardTitle>
                  <CardDescription>
                    Recomendações baseadas em algoritmos de I.A. e RAG (Retrieval Augmented Generation)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedAnalysis.insights.strategic_recommendations.map((rec, index) => (
                    <div key={`rec-${index}`} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">{rec}</p>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline">Aplicar</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional insight cards could be added here */}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* New Analysis Sheet */}
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
