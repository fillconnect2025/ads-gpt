export interface IFacebookAdsAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string;
  signedRequest: string;
  userID: string;
}

export interface IFacebookAdsAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

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

interface CampaignAd {
  data: { id: string }[];
}

export interface PagingCursors {
  before: string;
  after: string;
}

export interface FacebookEntityReference {
  id: string;
}

export interface FacebookAdsData {
  data: FacebookEntityReference[];
  paging: {
    cursors: PagingCursors;
  };
}

export interface IFacebookAdsCampaign {
  id: number;
  account_id: string;
  bid_strategy: string;
  budget_rebalance_flag: boolean;
  budget_remaining: number;
  buying_type: string;
  campaign_group_active_time: string;
  can_create_brand_lift_study: boolean;
  can_use_spend_cap: boolean;
  configured_status: string;
  created_time: string; // ISO string
  daily_budget: number;
  effective_status: string;
  has_secondary_skadnetwork_reporting: boolean;
  is_budget_schedule_enabled: boolean;
  is_skadnetwork_attribution: boolean;
  name: string;
  objective: string;
  pacing_type: string[];
  primary_attribution: string;
  smart_promotion_type: string;
  source_campaign: FacebookEntityReference;
  source_campaign_id: string;
  special_ad_categories: string[];
  special_ad_category: string;
  start_time: string;
  status: string;
  topline_id: string;
  updated_time: string;
  ads: FacebookAdsData;
  adsets: FacebookAdsData;
}
