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
