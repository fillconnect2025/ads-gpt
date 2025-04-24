
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IAdsAnalysis, ICampaignMetrics } from '@/@types/supabase';
import { formatCurrency, formatPercent, getMetricColorClass } from '@/utils/ragHelpers';
import { BarChart, Download, ThumbsUp, ThumbsDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface AnalysisResultsProps {
  analysis: IAdsAnalysis;
  onSubmitRating: (id: string, rating: number) => void;
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  positive,
  prefix = "",
  suffix = ""
}: { 
  title: string; 
  value: string | number;
  change?: string | number;
  positive?: boolean;
  prefix?: string;
  suffix?: string;
}) => {
  const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</div>
      <div className="flex justify-between items-center">
        <div className={cn(
          "text-xl font-semibold",
          positive !== undefined ? (positive ? "text-green-600" : "text-red-600") : ""
        )}>
          {prefix}{value}{suffix}
        </div>
        
        {change && (
          <div className={cn(
            "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
            positive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
          )}>
            <ChangeIcon className="h-3 w-3 mr-1" />
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onSubmitRating }) => {
  const { toast } = useToast();
  
  const handleExportPDF = () => {
    toast({
      title: "Exportação iniciada",
      description: "O relatório PDF está sendo gerado e será baixado automaticamente."
    });
    // In a real app, this would trigger PDF generation and download
  };
  
  const handleRating = (rating: number) => {
    onSubmitRating(analysis.id, rating);
  };
  
  // Helper to determine if a metric should be displayed as positive or negative
  const isMetricPositive = (name: string, value: number): boolean => {
    switch (name) {
      case 'cpc':
      case 'cpm':
        return value < 5; // Lower is better
      case 'ctr':
        return value > 2; // Higher is better
      case 'roas':
        return value > 1; // Higher is better
      case 'conversion_rate':
        return value > 3; // Higher is better
      default:
        return true;
    }
  };
  
  // Helper function to get color classes based on value
  const getColorClass = (isPositive: boolean): string => {
    return isPositive ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900';
  };

  // Extract metrics and insights with null checks and type assertion
  // Create a default empty metrics object that matches the ICampaignMetrics interface
  const defaultMetrics: ICampaignMetrics = {
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    cpm: 0,
    spend: 0,
    frequency: 0
  };
  
  // Use the default metrics if analysis.metrics is empty or undefined
  const metrics: ICampaignMetrics = analysis.metrics ? analysis.metrics as ICampaignMetrics : defaultMetrics;
  const insights = analysis.insights || { strengths: [], weaknesses: [], recommendations: [] };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{analysis.campaign_name}</CardTitle>
            <CardDescription>
              Análise concluída em {new Date(analysis.updated_at).toLocaleDateString('pt-BR')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Score: {analysis.score}/100
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Métricas Principais</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {metrics && typeof metrics.ctr === 'number' && (
                  <MetricCard 
                    title="CTR (Taxa de Cliques)" 
                    value={formatPercent(metrics.ctr)}
                    positive={isMetricPositive('ctr', metrics.ctr)}
                    change="+0.5%"
                  />
                )}
                {metrics && typeof metrics.cpc === 'number' && (
                  <MetricCard 
                    title="CPC (Custo por Clique)" 
                    value={metrics.cpc}
                    prefix="R$ "
                    positive={isMetricPositive('cpc', metrics.cpc)}
                    change="-0.20"
                  />
                )}
                {metrics && typeof metrics.cpm === 'number' && (
                  <MetricCard 
                    title="CPM (Custo por Mil)" 
                    value={metrics.cpm}
                    prefix="R$ "
                    positive={isMetricPositive('cpm', metrics.cpm)}
                    change="+1.30"
                  />
                )}
                {metrics && typeof metrics.roas === 'number' && (
                  <MetricCard 
                    title="ROAS" 
                    value={metrics.roas}
                    prefix=""
                    suffix="x"
                    positive={isMetricPositive('roas', metrics.roas)}
                    change="+0.3"
                  />
                )}
                {metrics && typeof metrics.conversion_rate === 'number' && (
                  <MetricCard 
                    title="Taxa de Conversão" 
                    value={formatPercent(metrics.conversion_rate)}
                    positive={isMetricPositive('conversion_rate', metrics.conversion_rate)}
                    change="-0.2%"
                  />
                )}
                {metrics && typeof metrics.impressions === 'number' && (
                  <MetricCard 
                    title="Impressões" 
                    value={metrics.impressions.toLocaleString('pt-BR')}
                  />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Desempenho da Campanha</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart className="mx-auto h-10 w-10 mb-2" />
                  <p>Visualização de gráfico de desempenho</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-green-700">Pontos Fortes</h3>
              <ul className="space-y-2">
                {insights.strengths && insights.strengths.map((strength, index) => (
                  <li key={`strength-${index}`} className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-red-700">Pontos Críticos</h3>
              <ul className="space-y-2">
                {insights.weaknesses && insights.weaknesses.map((weakness, index) => (
                  <li key={`weakness-${index}`} className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Análises Adicionais</h3>
              
              {insights.benchmark_comparison && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Comparação com o Benchmark</h4>
                  <p className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
                    {insights.benchmark_comparison}
                  </p>
                </div>
              )}
              
              {insights.audience_analysis && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Análise de Audiência</h4>
                  <p className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-purple-800">
                    {insights.audience_analysis}
                  </p>
                </div>
              )}
              
              {insights.creative_analysis && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Análise de Criativos</h4>
                  <p className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800">
                    {insights.creative_analysis}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Recomendações Estratégicas</h3>
              <ul className="space-y-2">
                {insights.strategic_recommendations ? (
                  insights.strategic_recommendations.map((recommendation, index) => (
                    <li key={`rec-${index}`} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
                      {recommendation}
                    </li>
                  ))
                ) : (
                  insights.recommendations && insights.recommendations.map((rec, index) => (
                    <li key={`rec-${index}`} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
                      {rec.title}: {rec.description}
                    </li>
                  ))
                )}
              </ul>
            </div>
            
            {insights.budget_impact && (
              <div>
                <h3 className="text-lg font-medium mb-3">Impacto do Orçamento</h3>
                <p className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800">
                  {insights.budget_impact}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Orçamento utilizado:</span>
                    <span className="ml-2 font-medium">{metrics && typeof metrics.spend === 'number' ? formatCurrency(metrics.spend) : 'N/A'}</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Otimizar Orçamento
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium mb-1">Essa análise foi útil?</h3>
              <div className="flex gap-2">
                <Button 
                  variant={analysis.rating === 1 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleRating(1)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Sim
                </Button>
                <Button 
                  variant={analysis.rating === 0 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleRating(0)}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Não
                </Button>
              </div>
            </div>
            
            <Button onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { cn } from '@/lib/utils';

export default AnalysisResults;
