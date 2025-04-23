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
  fetchPutAdAccounts: (ids: string[]) => void;

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

  const [integrations, setIsIntegrations] = useState<IModelIntegration[]>([]);
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
      setIsIntegrations(data);
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
      console.log('error ', error);
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

  const fetchPutAdAccounts = async (ids: string[]) => {
    setIsFetchPutAdAccounts(true);
    try {
      const { success, message } =
        await supabaseServiceFacebookAds.updateFacebookAdAccountsStatus(
          ids
        );

      toast({
        title: success
          ? 'Conexão realizada com sucesso!'
          : 'Não foi possível completar a conexão',
        description: success
          ? 'As contas de anúncios foram sincronizadas com sucesso.'
          : message || 'Tente novamente mais tarde ou verifique sua conexão.',
        variant: success ? 'default' : 'destructive',
      });
    } catch (error: any) {
      console.log('error ', error);
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
        fetchPutAdAccounts,

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
