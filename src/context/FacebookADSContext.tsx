import { ISelectedAccount } from '@/@types/integrations.type';
import { IModelFacebookAdAccounts, IModelIntegration } from '@/@types/supabase';
import { useToast } from '@/hooks/use-toast';
import { facebookAdsService } from '@/services/facebookAdsService';
import { supabaseServiceFacebookAds } from '@/services/supabaseService';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface FacebookAdsType {
  handleConnectFacebookAds: () => void;
  fetchGetAllIntegration: () => void;
  fetchGetAdAccounts: (integrationId: string) => void;
  fetchPutAdAccountsAdsCampaigns: (
    selectedAccounts: ISelectedAccount[]
  ) => void;

  integrations: IModelIntegration[] | [];
  adAccounts: IModelFacebookAdAccounts[] | [];

  isConnectingFacebookAds: boolean;
  isLoadingIntegration: boolean;
  isLoadingSelectAdAccounts: boolean;
  isFetchPutAdAccounts: boolean;
}

const FacebookAdsContext = createContext<FacebookAdsType | undefined>(
  undefined
);

const FB_APP_ID = '1133619098203847';

export const FacebookAdsAuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [integrations, setIntegrations] = useState<IModelIntegration[]>([]);
  const [adAccounts, setAdAccounts] = useState<IModelFacebookAdAccounts[]>([]);

  const [isLoadingIntegration, setIsLoadingIntegration] = useState(true);
  const [isLoadingSelectAdAccounts, setIsLoadingSelectAdAccounts] =
    useState(false);
  const [isConnectingFacebookAds, setIsConnectingFacebookAds] = useState(false);
  const [isFetchPutAdAccounts, setIsFetchPutAdAccounts] = useState(false);

  useEffect(() => {
    if (!facebookAdsService.validateAppId(FB_APP_ID)) {
      console.error('Facebook App ID inválido:', FB_APP_ID);
      toast({
        title: 'App ID do Facebook válido!',
        description:
          ' App ID do Facebook configurado não é válido. Verifique as configurações',
        variant: 'destructive',
      });
      setIsLoadingIntegration(false);
      return;
    }

    facebookAdsService.initFacebookSdk();
  }, []);

  // REALIZAR CONEXÃO COM O FACEBOOK
  // SALVAR OS DADOS DE CONEXÃO DO FACEBOOK
  const handleConnectFacebookAds = async () => {
    try {
      setIsConnectingFacebookAds(true);
      const response = await facebookAdsService.login();
      if (response.success) {
        const resultExchangeForLongLivedToken =
          await facebookAdsService.exchangeForLongLivedToken(
            response.data.accessToken
          );

        if (!resultExchangeForLongLivedToken.success) {
          toast({
            title: 'Erro de Conexão',
            description: response.message,
            variant: 'destructive',
          });
        } else {
          const { success, message } =
            await supabaseServiceFacebookAds.saveFacebookIntegration(user.id, {
              ...response.data,
              accessToken: resultExchangeForLongLivedToken.data.access_token,
              expiresIn: resultExchangeForLongLivedToken.data.expires_in,
            });

          toast({
            title: success
              ? 'Conexão realizado com sucesso'
              : 'Erro ao realizar a Conexão',
            description: message,
            variant: success ? 'default' : 'destructive',
          });
          if (success) await fetchGetAllIntegration();
        }
      } else {
        toast({
          title: 'Erro de Conexão',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      return {
        success: false,
        title: 'Erro ao solicitar',
        description:
          error.message ||
          'Verifique sua conexão ou tente novamente mais tarde',
      };
    } finally {
      setIsConnectingFacebookAds(false);
    }
  };

  const fetchGetAllIntegration = async () => {
    setIsLoadingIntegration(true);
    try {
      const { data, success, message } =
        await supabaseServiceFacebookAds.getAllIntegration(user.id);

      if (!success) {
        toast({
          title: 'Não foi possível carregar os dados',
          description: message,
          variant: 'destructive',
        });
      }

      const integrationsWithQtd = data.map((integration) => {
        let adAccountQtd = 0;
        let campaignQtd = 0;
        let adQtd = 0;

        adAccountQtd = integration.fb_ad_accounts?.length || 0;

        integration.fb_ad_accounts?.forEach((adAccount: any) => {
          const campaigns = adAccount.fb_campaigns || [];
          campaignQtd += campaigns.length;

          campaigns.forEach((campaign: any) => {
            adQtd += campaign.fb_campaign_ads?.length || 0;
          });
        });

        return {
          ...integration,
          qtd: {
            adAccountQtd,
            campaignQtd,
            adQtd,
          },
        };
      });

      setIntegrations(integrationsWithQtd);
    } catch (error: any) {
      return {
        success: false,
        title: 'Erro ao solicitar',
        description:
          error.message ||
          'Verifique sua conexão ou tente novamente mais tarde',
      };
    } finally {
      setIsLoadingIntegration(false);
    }
  };

  const fetchGetAdAccounts = async (integrationId: string) => {
    setIsLoadingSelectAdAccounts(true);
    try {
      const accessToken = integrations.find(
        (integration) => integration.provider === 'facebook'
      );

      const resultMeAdAccounts = await facebookAdsService.meAdAccounts(
        accessToken.access_token
      );

      const adAccountsData = resultMeAdAccounts.data.map((adAccounts) => ({
        name: adAccounts.name,
        account_id: adAccounts.account_id,
        account_status: adAccounts.account_status,
        updated_at: new Date(),
        integration_id: integrationId,
        amount_spent: parseInt(adAccounts.amount_spent, 10) || 0,
        business_name: adAccounts?.business
          ? adAccounts?.business.name
          : adAccounts.name,
        business_id: adAccounts?.business
          ? adAccounts?.business.id
          : adAccounts.account_id,
      }));

      const { data, success, message } =
        await supabaseServiceFacebookAds.saveFacebookAdAccounts(adAccountsData);

      if (!success) {
        toast({
          title: 'Não foi possível carregar os dados',
          description: message,
          variant: 'destructive',
        });
      }

      setAdAccounts(data);
    } catch (error: any) {
      return {
        success: false,
        title: 'Erro ao solicitar',
        description:
          error.message ||
          'Verifique sua conexão ou tente novamente mais tarde',
      };
    } finally {
      setIsLoadingSelectAdAccounts(false);
    }
  };

  const fetchPutAdAccountsAdsCampaigns = async (
    selectedAccounts: ISelectedAccount[]
  ) => {
    setIsFetchPutAdAccounts(true);
    try {
      // Atualiza o status das contas de anúncios no Supabase
      const accountIds = selectedAccounts.map((item) => item.account_id);
      const { data, success, message } =
        await supabaseServiceFacebookAds.updateFacebookAdAccountsStatus(
          accountIds
        );

      if (success) {
        const accessToken = integrations.find(
          (integration) => integration.provider === 'facebook'
        );

        // Obter todas as campanhas para cada conta de anúncio
        for (const selectedAccount of selectedAccounts) {
          const campaignRes = await facebookAdsService.getAdAccountCampaigns(
            selectedAccount.account_id,
            accessToken.access_token
          );

          if (!campaignRes.success || !campaignRes.data) {
            toast({
              title: 'Erro ao completar a conexão campaignRes',
              description:
                campaignRes.message ||
                'Tente novamente mais tarde ou verifique sua conexão.',
              variant: 'destructive',
            });
            break;
          }
          const flattenedCampaigns = campaignRes.data.map((campaign) => {
            return {
              // tipo: enum,
              status: true,
              objective: campaign.objective,
              account_id: campaign.account_id,
              budget_remaining: campaign.budget_remaining,
              buying_type: campaign.buying_type,
              daily_budget: campaign.daily_budget,
              effective_status: campaign.effective_status,
              start_time: campaign.start_time,
              updated_time: campaign.updated_time,
              fb_ad_account_id: selectedAccount.id,
              name: campaign.name,
              campaign_id: campaign.id,
              created_time: campaign.created_time,
            };
          });

          const campaignResponse =
            await supabaseServiceFacebookAds.saveFacebookCampaign(
              flattenedCampaigns
            );

          if (!campaignResponse.success || !campaignResponse.data) {
            toast({
              title: 'Erro ao completar a conexão campaignResponse',
              description:
                campaignResponse.message ||
                'Tente novamente mais tarde ou verifique sua conexão.',
              variant: 'destructive',
            });
            break;
          }

          const flattenedCampaignAds = campaignRes.data.flatMap((campanha) => {
            const campaignData = campaignResponse.data.find(
              (camp) => camp.campaign_id == campanha.id
            );
            if (campaignData && campanha?.ads?.data) {
              return campanha.ads.data.map((ad) => ({
                ad_id: ad.id,
                campaign_id: campaignData.id,
              }));
            }
            return [];
          });

          if (flattenedCampaignAds.length) {
            const resultCampaignAds =
              await supabaseServiceFacebookAds.saveFacebookCampaignAds(
                flattenedCampaignAds
              );

            if (!resultCampaignAds.success || !resultCampaignAds.data) {
              toast({
                title: 'Erro ao completar a conexão campaignResponse',
                description:
                  campaignResponse.message ||
                  'Tente novamente mais tarde ou verifique sua conexão.',
                variant: 'destructive',
              });
              break;
            }
          }
        }

        // Se tudo ocorreu bem, exibe a mensagem de sucesso
        toast({
          title: 'Conexão completada com sucesso',
          description: 'As contas de anúncios foram sincronizadas com sucesso.',
        });
      } else {
        toast({
          title: 'Erro ao completar a conexão',
          description:
            message || 'Tente novamente mais tarde ou verifique sua conexão.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      return {
        success: false,
        title: 'Erro ao solicitar',
        description:
          error.message ||
          'Verifique sua conexão ou tente novamente mais tarde',
      };
    } finally {
      setIsFetchPutAdAccounts(false);
    }
  };

  return (
    <FacebookAdsContext.Provider
      value={{
        // FUNCTION
        handleConnectFacebookAds,
        fetchGetAllIntegration,
        fetchGetAdAccounts,
        fetchPutAdAccountsAdsCampaigns,

        //STATES
        adAccounts,
        integrations,
        isLoadingSelectAdAccounts,
        isLoadingIntegration,
        isConnectingFacebookAds,
        isFetchPutAdAccounts,
      }}
    >
      {children}
    </FacebookAdsContext.Provider>
  );
};

export const useFacebookAds = () => {
  const context = useContext(FacebookAdsContext);

  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }

  return context;
};
