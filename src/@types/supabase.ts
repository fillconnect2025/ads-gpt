import { IIntegrationQtd } from './integrations.type';

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
  qtd: IIntegrationQtd;
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
  fb_campaigns: IModelFacebookCampaign[];
}

export interface IModelFacebookCampaign {
  id?: string;
  tipo?: string;
  status: boolean;
  objective: string;
  created_at?: string;
  account_id: string;
  budget_remaining?: number | null;
  buying_type: string;
  daily_budget?: number | null;
  effective_status?: string;
  start_time?: string;
  updated_time?: string;
  fb_ad_account_id: string;
  campaign_id: number;
  created_time?: string;
  fb_campaign_ads: IModelFacebookCampaignAds[];
}

export interface IModelFacebookCampaignAds {
  id?: string;
  campaign_id: string;
  ad_id: string;
}
