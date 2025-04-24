
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
  metrics: {
    impressions: 150000,
    clicks: 7500,
    ctr: 5,
    cpc: 0.75,
    spend: 5625,
    conversions: 225,
    cost_per_conversion: 25,
    roas: 3.5
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
    ]
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
