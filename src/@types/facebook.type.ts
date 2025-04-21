export interface IFacebookAdsAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string
  signedRequest: string;
  userID: string;
}

export interface IFacebookAdsAccessTokenResponse  {
  access_token: string;
  token_type: string; 
  expires_in: number; 
};

export interface IFacebookAdsAdAccount {
  id: string; 
  account_id: number; 
  name: string; 
  account_status: number; // Status da conta (1: Ativa, 2: Desativada, etc.)
  currency: string; 
  timezone_name: string; 
  amount_spent: string; // Valor total gasto pela conta (em centavos da moeda)
  daily_spend_limit?: string; // Limite diário de gastos da conta
  spend_cap?: string; // Teto máximo de gastos permitido para a conta
  business?: {
    id: number; 
    name: string; 
  };
  funding_source_details?: {
    display_string: string; // Descrição da fonte de financiamento (ex: 'Cartão de crédito')
  };
  disable_reason?: number; // Código indicando o motivo da desativação da conta
  min_campaign_group_spend_cap?: string;
}

export interface FacebookAdsCampaign {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  objective: string;
  start_time: string;
  stop_time?: string;
  daily_budget?: string;
  lifetime_budget?: string;
}

export interface FacebookAdsAdMetrics {
  impressions: number;
  clicks: number;
  spend: string;
  cpc: string;
  ctr: string;
  reach: number;
  frequency: number;
  costPerResult?: string;
  conversions?: number;
}

export interface FacebookAdsApiError {
  code: number;
  message: string;
  subcode?: number;
  type: string;
  fbtrace_id: string;
}

export type FacebookAdsPermission = 'ads_read' | 'ads_management' | 'business_management';

export interface FacebookAdsTokenStatus {
  appId: string;
  application: string;
  data_access_expires_at: number;
  expires_at: number;
  isValid: boolean;
  scopes: FacebookAdsPermission[];
}

export type SyncLogType = 'info' | 'success' | 'warning' | 'error';

export interface SyncLogEntry {
  type: SyncLogType;
  timestamp: Date;
  message: string;
  details: string;
}

export type DatePresetType = 
  'today' | 
  'yesterday' | 
  'this_month' | 
  'last_month' | 
  'this_quarter' | 
  'lifetime' | 
  'last_3_months' | 
  'last_6_months' | 
  'last_7d' | 
  'last_14d' | 
  'last_28d' | 
  'last_30d' | 
  'last_90d' | 
  'last_week_mon_sun' | 
  'last_week_sun_sat' | 
  'last_quarter' | 
  'last_year' | 
  'this_week_mon_today' | 
  'this_week_sun_today' | 
  'this_year';


  