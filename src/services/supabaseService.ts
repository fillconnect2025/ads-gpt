import { IFacebookAdsAuthResponse } from '@/@types/facebook.type';
import { IModelFacebookAdAccounts, IModelIntegration } from '@/@types/supabase';
import { supabase } from '@/utils/supabase';

export interface IProfileResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// 🔹 Buscar todas integração e portfólios do usuário
export const supabaseServiceFacebookAds = {
  getAllIntegration: async (
    userId: string
  ): Promise<IProfileResponse<IModelIntegration[] | []>> => {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select(
          `
        *,
        fb_ad_accounts (*)
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
    ids: string[]
  ): Promise<IProfileResponse<IModelFacebookAdAccounts[]>> => {
    try {
      const { data, error } = await supabase
        .from('fb_ad_accounts')
        .update({ is_active: true })
        .in('id', ids)
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
};
