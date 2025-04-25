import { IFacebookAdsAuthResponse } from '@/@types/facebook.type';
import {
  IModelFacebookAdAccounts,
  IModelFacebookCampaign,
  IModelFacebookCampaignAds,
  IModelIntegration,
} from '@/@types/supabase';
import { supabase } from '@/utils/supabase';

export interface IProfileResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const supabaseServiceFacebookAds = {
  // Buscar todas integração e portfólios do usuário
  getAllIntegration: async (
    userId: string
  ): Promise<IProfileResponse<IModelIntegration[] | []>> => {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select(
          `
        *,
        fb_ad_accounts (
          *,
          fb_campaigns (
            *,
            fb_campaign_ads (*)
          )
        )
      `
        )
        .eq('user_id', userId);

      if (error) {
        return {
          success: false,
          message: error.message,
          data: [],
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      return {
        success: false,
        message: 'Failed to supabase profiles data',
        data: [],
      };
    }
  },

  saveFacebookIntegration: async (
    userId: string,
    integrationData: IFacebookAdsAuthResponse
  ): Promise<IProfileResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .upsert(
          {
            provider: integrationData.graphDomain,
            account_id: integrationData.userID,
            access_token: integrationData.accessToken,
            token_expires_at: new Date(
              integrationData.data_access_expiration_time * 1000
            ).toISOString(),
            name: integrationData.graphDomain.toUpperCase(),
            user_id: userId,
          },
          { onConflict: 'user_id,provider' }
        )
        .select()
        .single();
      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error saving Facebook integration:', error);
      return {
        success: false,
        message: 'Failed to save Facebook integration',
      };
    }
  },

  saveFacebookAdAccounts: async (
    portfolioData: IModelFacebookAdAccounts[]
  ): Promise<IProfileResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('fb_ad_accounts')
        .upsert(portfolioData, {
          onConflict: 'account_id', // define a chave composta de conflito
        })
        .select();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error saving Facebook integration:', error);
      return {
        success: false,
        message: 'Failed to save Facebook integration',
      };
    }
  },

  updateFacebookAdAccountsStatus: async (
    accountIds: number[]
  ): Promise<IProfileResponse<IModelFacebookAdAccounts[]>> => {
    try {
      const { data, error } = await supabase
        .from('fb_ad_accounts')
        .update({ is_active: true })
        .in('account_id', accountIds)
        .select();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error updating account statuses:', error);
      return {
        success: false,
        message: 'Failed to update account statuses',
      };
    }
  },

  // Buscar campanhas e anúncios de um usuário
  getAllCampaigns: async (
    userId: string
  ): Promise<IProfileResponse<FacebookCampaign[] | []>> => {
    try {
      const { data, error } = await supabase
        .from('fb_campaigns')
        .select(
          `
          *,
          campaign_ads (*)
        `
        )
        .eq('user_id', userId);

      if (error) {
        return {
          success: false,
          message: error.message,
          data: [],
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error fetching campaigns data:', error);
      return {
        success: false,
        message: 'Failed to fetch campaigns data',
        data: [],
      };
    }
  },

  // Salvar ou atualizar campanhas
  saveFacebookCampaign: async (
    campaignData: IModelFacebookCampaign[]
  ): Promise<IProfileResponse<IModelFacebookCampaign[]>> => {
    try {
      const { data, error } = await supabase
        .from('fb_campaigns')
        .upsert(campaignData, { onConflict: 'campaign_id' })
        .select();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error saving Facebook campaign:', error);
      return {
        success: false,
        message: 'Failed to save Facebook campaign',
      };
    }
  },

  //  Salvar ou atualizar anúncios vinculados a campanhas
  saveFacebookCampaignAds: async (
    adsData: IModelFacebookCampaignAds[]
  ): Promise<IProfileResponse<IModelFacebookCampaignAds[]>> => {
    try {
      const { data, error } = await supabase
        .from('fb_campaign_ads')
        .upsert(adsData, { onConflict: 'ad_id' })
        .select();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error saving Facebook ads:', error);
      return {
        success: false,
        message: 'Failed to save Facebook ads',
      };
    }
  },
};
