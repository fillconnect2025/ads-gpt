
import { ICampaignMetrics, ICampaignInsights } from '@/@types/supabase';
import { isDateInThePast } from './help';

// RAG prompt templates for different analysis aspects
export const ragPromptTemplates = {
  generalPerformance: (metrics: ICampaignMetrics) => `
    Com base nos dados enviados, avalie o desempenho geral da campanha, considerando:
    - CPM: ${metrics.cpm}
    - CPC: ${metrics.cpc}
    - CTR: ${metrics.ctr}
    - ROAS: ${metrics.roas || 'N/A'}
    - Frequência: ${metrics.frequency}
    - Taxa de conversão: ${metrics.conversion_rate || 'N/A'}
  `,
  strengths: (metrics: ICampaignMetrics) => `
    Liste os pontos positivos desta campanha com base nos resultados obtidos:
    - Impressões: ${metrics.impressions}
    - Alcance: ${metrics.reach}
    - Cliques: ${metrics.clicks}
    - CTR: ${metrics.ctr}
    - Conversões: ${metrics.conversions || 'N/A'}
  `,
  weaknesses: (metrics: ICampaignMetrics) => `
    Identifique falhas, gargalos ou métricas abaixo do esperado nesta campanha:
    - CPM: ${metrics.cpm}
    - CPC: ${metrics.cpc}
    - CTR: ${metrics.ctr}
    - ROAS: ${metrics.roas || 'N/A'}
    - Frequência: ${metrics.frequency}
    - Taxa de conversão: ${metrics.conversion_rate || 'N/A'}
  `,
  strategicRecommendations: (metrics: ICampaignMetrics, insights: Partial<ICampaignInsights>) => `
    Sugira otimizações para melhorar os resultados nas próximas campanhas, considerando:
    - Pontos fortes identificados: ${insights.strengths?.join(', ') || 'N/A'}
    - Pontos fracos identificados: ${insights.weaknesses?.join(', ') || 'N/A'}
    - Métricas atuais: CPC: ${metrics.cpc}, CTR: ${metrics.ctr}, Conversões: ${metrics.conversions || 'N/A'}
  `,
  benchmarking: (metrics: ICampaignMetrics, objective: string) => `
    Compare o desempenho desta campanha com a média do setor para campanhas com o objetivo de ${objective}:
    - CPM: ${metrics.cpm}
    - CPC: ${metrics.cpc}
    - CTR: ${metrics.ctr}
    - Taxa de conversão: ${metrics.conversion_rate || 'N/A'}
  `,
  budgetImpact: (metrics: ICampaignMetrics) => `
    Avalie como o orçamento de ${metrics.spend} influenciou o desempenho e sugira ajustes.
  `,
  audienceAnalysis: (metrics: ICampaignMetrics) => `
    Analise se o público-alvo foi bem escolhido com base no CTR (${metrics.ctr}) e nas conversões (${metrics.conversions || 'N/A'}).
  `,
  creativeAnalysis: (metrics: ICampaignMetrics) => `
    Com base nas taxas de engajamento e CTR (${metrics.ctr}), avalie a efetividade dos criativos e formatos usados.
  `
};

// Generate mock metrics for demonstration purposes
export const generateMockMetrics = (): ICampaignMetrics => {
  return {
    impressions: Math.floor(Math.random() * 500000) + 50000,
    reach: Math.floor(Math.random() * 200000) + 20000,
    clicks: Math.floor(Math.random() * 20000) + 1000,
    ctr: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    cpc: parseFloat((Math.random() * 2 + 0.2).toFixed(2)),
    cpm: parseFloat((Math.random() * 10 + 1).toFixed(2)),
    spend: parseFloat((Math.random() * 5000 + 500).toFixed(2)),
    conversions: Math.floor(Math.random() * 1000) + 50,
    conversion_rate: parseFloat((Math.random() * 10 + 0.5).toFixed(2)),
    roas: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    frequency: parseFloat((Math.random() * 5 + 1).toFixed(2)),
  };
};

// Generate mock insights for demonstration purposes
export const generateMockInsights = (): ICampaignInsights => {
  return {
    strengths: [
      "CTR acima da média do setor para campanhas similares",
      "Bom equilíbrio entre alcance e frequência",
      "Custo por conversão eficiente para o segmento",
      "Forte desempenho em dispositivos móveis"
    ],
    weaknesses: [
      "CPM elevado em comparação com campanhas anteriores",
      "Taxa de conversão abaixo do benchmark",
      "Desempenho inconsistente entre segmentos demográficos",
      "Queda no engajamento após o 5º dia de campanha"
    ],
    strategic_recommendations: [
      "Aumentar orçamento para os segmentos com melhor desempenho",
      "Testar novos formatos de anúncios para melhorar o CTR",
      "Ajustar a segmentação para focar em públicos com maior taxa de conversão",
      "Otimizar os criativos com base nos insights de engajamento"
    ],
    benchmark_comparison: "A campanha apresentou CTR 15% acima da média do setor, porém com CPM 10% mais alto e taxa de conversão 5% abaixo do benchmark para campanhas similares.",
    budget_impact: "O orçamento foi distribuído eficientemente, mas recomenda-se aumentar o investimento nos segmentos de melhor desempenho para maximizar ROAS.",
    audience_analysis: "O público de 25-34 anos teve o melhor desempenho, enquanto o segmento acima de 45 anos teve custo por conversão 30% maior que a média.",
    creative_analysis: "Os anúncios em formato carrossel tiveram CTR 25% superior aos formatos estáticos, sugerindo preferência do público por conteúdo interativo."
  };
};

// Generate a mock AI analysis score
export const generateAnalysisScore = (): number => {
  return Math.floor(Math.random() * 40) + 60; // Score between 60-100
};

// Simulate the AI analysis process with staged updates
export const simulateAnalysisProcess = async (
  id: string, 
  callback: (status: string, progress: number) => void
): Promise<void> => {
  const stages = [
    { status: 'collecting', time: 2000, progress: 20 },
    { status: 'processing', time: 3000, progress: 40 },
    { status: 'evaluating', time: 3000, progress: 60 },
    { status: 'personalizing', time: 3000, progress: 80 },
    { status: 'completed', time: 1000, progress: 100 }
  ];
  
  for (const stage of stages) {
    await new Promise(resolve => setTimeout(resolve, stage.time));
    callback(stage.status, stage.progress);
  }
};

// Format percentage for display
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Determine if a metric is positive or negative
export const isPositiveMetric = (
  metricName: string, 
  value: number, 
  benchmark?: number
): boolean => {
  if (benchmark !== undefined) {
    // Compare with benchmark if available
    if (['cpc', 'cpm', 'frequency'].includes(metricName)) {
      return value <= benchmark;
    }
    return value >= benchmark;
  }
  
  // Default assessments without benchmarks
  switch(metricName) {
    case 'ctr':
    case 'conversion_rate':
    case 'roas':
      return value > 2; // These should be higher
    case 'cpc':
    case 'cpm':
      return value < 5; // These should be lower
    default:
      return true;
  }
};

// Determine color class based on positive/negative metric
export const getMetricColorClass = (
  metricName: string, 
  value: number, 
  benchmark?: number
): string => {
  const isPositive = isPositiveMetric(metricName, value, benchmark);
  return isPositive ? 'text-green-600' : 'text-red-600';
};

// Format currency values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Get status display text and color
export const getStatusInfo = (status: string): { text: string, color: string } => {
  const statusMap: Record<string, { text: string, color: string }> = {
    'collecting': { text: 'Coletando dados', color: 'bg-blue-100 text-blue-800' },
    'processing': { text: 'Processando métricas', color: 'bg-blue-100 text-blue-800' },
    'evaluating': { text: 'Avaliando desempenho', color: 'bg-purple-100 text-purple-800' },
    'personalizing': { text: 'Aplicando IA personalizada', color: 'bg-purple-100 text-purple-800' },
    'completed': { text: 'Análise concluída', color: 'bg-green-100 text-green-800' },
    'failed': { text: 'Análise falhou', color: 'bg-red-100 text-red-800' }
  };
  
  return statusMap[status] || { text: 'Status desconhecido', color: 'bg-gray-100 text-gray-800' };
};
