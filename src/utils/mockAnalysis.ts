
import { IAdsAnalysis } from '@/@types/supabase';

export const generateMockAnalysis = (): IAdsAnalysis => ({
  id: 'mock-1',
  user_id: 'user-1',
  campaign_name: "Campanha Black Friday",
  platform: "Facebook Ads",
  start_date: "2025-03-01",
  end_date: "2025-03-20",
  objective: 'conversao',
  status: 'completed',
  score: 84,
  rating: undefined,
  metrics: {
    impressions: 150000,
    clicks: 7500,
    ctr: 5,
    cpc: 0.75,
    spend: 5625,
    conversions: 225,
    cost_per_conversion: 25,
    roas: 3.5,
    cpm: 37.5,
    reach: 120000,
    frequency: 1.25,
    conversion_rate: 3.0
  },
  insights: {
    strengths: [
      "CTR acima da média do setor (5%)",
      "ROAS positivo de 3.5x",
      "Alto volume de impressões qualificadas"
    ],
    weaknesses: [
      "CPC pode ser otimizado",
      "Potencial de escala não explorado",
      "Segmentação pode ser mais específica"
    ],
    recommendations: [
      {
        category: "budget",
        title: "Otimizar Distribuição de Orçamento",
        description: "Concentrar 60% do budget entre 19h e 22h",
        impact: "+22% ROAS",
        tokens: 3
      },
      {
        category: "targeting",
        title: "Refinar Segmentação por Idade",
        description: "Público 25-34 anos tem CPA 40% menor",
        impact: "-35% CPA",
        tokens: 2
      },
      {
        category: "creative",
        title: "Otimizar Criativos",
        description: "Imagens com pessoas têm CTR 27% maior",
        impact: "+25% CTR",
        tokens: 2
      }
    ],
    strategic_recommendations: [
      "Aumentar orçamento em 20% nos horários de melhor desempenho",
      "Criar segmentação específica para usuários móveis",
      "Utilizar criativo com pessoas reais nas imagens"
    ],
    benchmark_comparison: "Seu CTR está 23% acima da média do setor para campanhas similares",
    audience_analysis: "Público feminino de 25-34 anos tem desempenho 40% superior à média",
    creative_analysis: "Criativos com pessoas reais têm CTR 27% maior que imagens genéricas",
    budget_impact: "Realocação de 20% do orçamento para horários de pico pode aumentar conversões em 15%"
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

export const generateMockAnalysisList = (count: number = 5): IAdsAnalysis[] => {
  return Array.from({ length: count }, (_, i) => ({
    ...generateMockAnalysis(),
    id: `mock-${i + 1}`,
    campaign_name: `Campanha ${i + 1}`,
    score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
    status: ['completed', 'processing', 'evaluating'][Math.floor(Math.random() * 3)] as IAdsAnalysis['status']
  }));
};
