import {
  IFacebookAdsAccessTokenResponse,
  IFacebookAdsAdAccount,
  IFacebookAdsAuthResponse,
  IFacebookAdsCampaign,
} from '@/@types/facebook.type';
import axios from 'axios';

const API_VERSION = 'v18.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;
const FB_PERMISSIONS = ['ads_read', 'ads_management', 'business_management'];
const APP_ID = '1133619098203847';
const APP_SECRET = 'f5062479dde972153c11c741e9f25b91';

const validateAppId = (appId: string): boolean => {
  return /^\d+$/.test(appId) && appId.length > 5;
};

export interface IFacebookAdsServiceRequest<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface IFacebookAdsServiceResponse<T> {
  data?: T;
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
}

export interface IFacebookErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
}

export const facebookAdsService = {
  validateAppId,

  // Obter um token de longa duração (60 dias)
  exchangeForLongLivedToken: async (
    shortLivedToken: string
  ): Promise<IFacebookAdsServiceRequest<IFacebookAdsAccessTokenResponse>> => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/oauth/access_token`,
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: APP_ID,
            client_secret: APP_SECRET,
            fb_exchange_token: shortLivedToken,
          },
        }
      );

      if (status !== 200) {
        return {
          success: false,
          message: 'Não foi possível autenticar com o Facebook ',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        'Erro desconhecido na requisição';
      return {
        success: false,
        message,
      };
    }
  },

  meAdAccounts: async (
    accessToken: string,
    afterCursor?: string
  ): Promise<IFacebookAdsServiceRequest<IFacebookAdsAdAccount[]>> => {
    try {
      const { data, status } = await axios.get(`${BASE_URL}/me/adaccounts`, {
        params: {
          access_token: accessToken,
          fields:
            'id,name,account_id,account_status,currency,timezone_name,amount_spent,daily_spend_limit,spend_cap,business',
          limit: 25, // pode ajustar o tamanho da página
          after: afterCursor, // paginação
        },
      });

      if (status !== 200) {
        return {
          success: false,
          message: 'Não foi possível autenticar com o Facebook ',
        };
      }

      return {
        success: true,
        data: data.data,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        'Erro desconhecido na requisição';
      return {
        success: false,
        message,
      };
    }
  },

  getAdAccountCampaigns: async (
    adAccountId: number,
    accessToken: string
  ): Promise<IFacebookAdsServiceRequest<IFacebookAdsCampaign[]>> => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/act_${adAccountId}/campaigns`,
        {
          params: {
            access_token: accessToken,
            fields:
              'id,account_id,adlabels,bid_strategy,boosted_object_id,brand_lift_studies,budget_rebalance_flag,budget_remaining,buying_type,campaign_group_active_time,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,daily_budget,effective_status,has_secondary_skadnetwork_reporting,is_budget_schedule_enabled,is_skadnetwork_attribution,issues_info,last_budget_toggling_time,lifetime_budget,name,objective,pacing_type,primary_attribution,promoted_object,smart_promotion_type,source_campaign,source_campaign_id,special_ad_categories,special_ad_category,special_ad_category_country,spend_cap,start_time,status,stop_time,topline_id,updated_time,ad_studies,adrules_governed,ads,adsets,copies',
            limit: 100, 
          },
        }
      );

      if (status !== 200) {
        return {
          success: false,
          message: 'Não foi possível buscar campanhas.',
        };
      }

      return {
        success: true,
        data: data.data,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        'Erro desconhecido na requisição';
      return {
        success: false,
        message,
      };
    }
  },

  // Inicializa o SDK do Facebook no navegador
  initFacebookSdk: (): Promise<void> => {
    return new Promise<void>((resolve) => {
      // @ts-ignore - O SDK do Facebook é carregado via script
      window.fbAsyncInit = function () {
        // @ts-ignore
        FB.init({
          appId: '1133619098203847', // ou use FB_APP_ID se vier de env/config
          cookie: true,
          xfbml: true,
          version: 'v18.0',
        });
        resolve(); // resolve após o init
      };

      // Carrega o SDK do Facebook
      (function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode?.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  },

  login: async (): Promise<
    IFacebookAdsServiceRequest<IFacebookAdsAuthResponse>
  > => {
    try {
      const authResponse = await new Promise<IFacebookAdsAuthResponse>(
        (resolve, reject) => {
          // @ts-ignore
          FB.login(
            (response: {
              authResponse: IFacebookAdsAuthResponse;
              status: string;
            }) => {
              console.log('authResponseauthResponse ', response);
              if (response?.authResponse) {
                resolve(response.authResponse);
              } else {
                reject(
                  new Error('Não foi possível autenticar com o Facebook.')
                );
              }
            },
            { scope: FB_PERMISSIONS.join(',') }
          );
        }
      );

      return {
        success: true,
        data: authResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Erro inesperado ao tentar fazer login com o Facebook.',
      };
    }
  },
};
