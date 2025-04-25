import { Badge } from '@/components/ui/badge';
import { useFacebookAds } from '@/context/FacebookADSContext';
import { useEffect, useState } from 'react';

export const useIntegration = () => {
  const {
    fetchGetAllIntegration,
    handleConnectFacebookAds,
    fetchGetAdAccounts,

    isConnectingFacebookAds,
    isLoadingIntegration,
    integrations,
    adAccounts,
    isLoadingSelectAdAccounts,
  } = useFacebookAds();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoSync, setAutoSync] = useState(true);

  const [openDialogSelectAdAccounts, setOpenDialogSelectAdAccounts] =
    useState(false);
  const [openIntegrationsDialog, setOpenIntegrationsDialog] = useState(false);


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'disconnected':
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Disconnected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  function handleIntegrations(type: string) {
    switch (type.toLowerCase()) {
      case 'activecampaign':
        return console.log('connectActiveCampaign() ');
      case 'e-goi':
        return console.log('connectEGoi() ');
      case 'facebook':
        return handleConnectFacebookAds();
      case 'google ads':
        return console.log('connectGoogleAds() ');
      case 'google analytics (universal analytics)':
        return console.log('connectUniversalAnalytics() ');
      case 'google analytics 4 (ga4)':
        return console.log('connectGA4() ');
      case 'google sheets':
        return console.log('connectGoogleSheets() ');
      case 'google meu negócio':
        return console.log('connectGoogleMeuNegocio() ');
      case 'google search console':
        return console.log('connectGoogleSearchConsole() ');
      case 'hotmart':
        return console.log('connectHotmart() ');
      case 'hubspot marketing':
        return console.log('connectHubspotMarketing() ');
      case 'hubspot sales':
        return console.log('connectHubspotSales() ');
      case 'instagram':
        return console.log('connectInstagram() ');
      case 'linkedin e linkedin ads':
        return console.log('connectLinkedIn() ');
      case 'mailchimp':
        return console.log('connectMailchimp() ');
      case 'meta ads':
        return console.log('connectMetaAds() ');
      case 'nuvemshop':
        return console.log('connectNuvemshop() ');
      case 'phonetrack':
        return console.log('connectPhonetrack() ');
      case 'pinterest e pinterest ads':
        return console.log('connectPinterest() ');
      case 'pipedrive':
        return console.log('connectPipedrive() ');
      case 'rd station marketing':
        return console.log('connectRDStationMarketing() ');
      case 'rd station crm':
        return console.log('connectRDStationCRM() ');
      case 'shopify':
        return console.log('connectShopify() ');
      case 'tiktok e tiktok ads':
        return console.log('connectTikTok() ');
      case 'x (twitter) ads':
        return console.log('connectTwitterAds() ');
      case 'youtube':
        return console.log('connectYouTube() ');
      case 'woocommerce':
        return console.log('connectWooCommerce() ');
      default:
        console.warn(`Integração não suportada: ${type}`);
        return null;
    }
  }

  useEffect(() => {
    fetchGetAllIntegration();
  }, []);

console.log("integration ", integrations)
  return {
    // FUNCTION
    getStatusBadge,
    handleConnectFacebookAds,
    handleIntegrations,
    fetchGetAdAccounts,

    // STATES
    isSyncing,
    isConnectingFacebookAds,
    syncProgress,
    autoSync,
    setAutoSync,
    isLoadingIntegration,
    integrations,
    adAccounts,
    openIntegrationsDialog,
    setOpenIntegrationsDialog,
    isLoadingSelectAdAccounts,
    openDialogSelectAdAccounts,
    setOpenDialogSelectAdAccounts,

  };
};
