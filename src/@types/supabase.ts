export interface IModelIntegration {
  id: string;
  user_id: string;
  provider: string;
  account_id: string;
  name: string;
  access_token: string;
  refresh_token: string | null;
  token_expires_at: string;
  created_at: string;
  update_at: string;
  lastSync: Date;
  status: string;
  fb_portfolio: IModelFacebookAdAccounts[];
}

export interface IModelFacebookAdAccounts {
  id?: string;
  name: string;
  account_id: number;
  is_active?: boolean;
  account_status: number;
  updated_at: Date; 
  integration_id: string;
  amount_spent: number;
  business_name: string;
  business_id: number;
}

export interface IAdsAnalysis {
  id: string;
  user_id: string;
  campaign_name: string;
  platform?: string;
  start_date: string;
  end_date: string;
  objective: string;
  status: 'pending' | 'collecting' | 'processing' | 'evaluating' | 'personalizing' | 'completed';
  score?: number;
  metrics?: {
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    spend: number;
    conversions: number;
    cost_per_conversion: number;
    roas: number;
  };
  insights?: {
    strengths: string[];
    weaknesses: string[];
    recommendations: {
      category: string;
      title: string;
      description: string;
      impact: string;
      tokens: number;
    }[];
  };
  created_at: string;
  updated_at: string;
}

export interface ICampaignMetrics {
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  spend: number;
  conversions?: number;
  conversion_rate?: number;
  roas?: number;
  frequency: number;
}

export interface ICampaignInsights {
  strengths: string[];
  weaknesses: string[];
  strategic_recommendations: string[];
  benchmark_comparison?: string;
  budget_impact?: string;
  audience_analysis?: string;
  creative_analysis?: string;
}
