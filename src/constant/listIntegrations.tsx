import { IListIntegration } from '@/@types/integrations.type';
import {
  Activity,
  BarChart,
  Database,
  Facebook,
  FileQuestion,
  FileSpreadsheet,
  Globe,
  Instagram,
  LineChart,
  Linkedin,
  Mail,
  MessageCircle,
  PackageSearch,
  Phone,
  PieChart,
  Send,
  ShoppingCart,
  Store,
  Target,
  Twitter,
  Youtube,
} from 'lucide-react';

export const listIntegrations: IListIntegration[] = [
  {
    name: 'ActiveCampaign',
    icon: <Mail />,
    disabled: true,
  },
  {
    name: 'E-goi',
    icon: <MessageCircle />,
    disabled: true,
  },
  {
    name: 'Facebook',
    icon: <Facebook />,
    disabled: false,
  },
  {
    name: 'Google Ads',
    icon: <Target />,
    disabled: true,
  },
  {
    name: 'Google Analytics (Universal Analytics)',
    icon: <BarChart />,
    disabled: true,
  },
  {
    name: 'Google Analytics 4 (GA4)',
    icon: <LineChart />,
    disabled: true,
  },
  {
    name: 'Google Sheets',
    icon: <FileSpreadsheet />,
    disabled: true,
  },
  {
    name: 'Google Meu Negócio',
    icon: <Globe />,
    disabled: true,
  },
  {
    name: 'Google Search Console',
    icon: <PieChart />,
    disabled: true,
  },
  {
    name: 'Hotmart',
    icon: <Store />,
    disabled: true,
  },
  {
    name: 'HubSpot Marketing',
    icon: <Send />,
    disabled: true,
  },
  {
    name: 'HubSpot Sales',
    icon: <Send />,
    disabled: true,
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    disabled: true,
  },
  {
    name: 'LinkedIn e LinkedIn Ads',
    icon: <Linkedin />,
    disabled: true,
  },
  {
    name: 'Mailchimp',
    icon: <Mail />,
    disabled: true,
  },
  {
    name: 'Meta Ads',
    icon: <Facebook />,
    disabled: true,
  },
  { name: 'Nuvemshop', icon: <ShoppingCart />, disabled: true },
  { name: 'Phonetrack', icon: <Phone />, disabled: true },
  {
    name: 'Pinterest e Pinterest Ads',
    icon: <PackageSearch />,
    disabled: true,
  },
  { name: 'Pipedrive', icon: <Database />, disabled: true },
  {
    name: 'RD Station Marketing',
    icon: <Activity />,
    disabled: true,
  },
  {
    name: 'RD Station CRM',
    icon: <Activity />,
    disabled: true,
  },
  { name: 'Shopify', icon: <ShoppingCart />, disabled: true },
  { name: 'TikTok e TikTok Ads', icon: <FileQuestion />, disabled: true },
  { name: 'X (Twitter) Ads', icon: <Twitter />, disabled: true },
  {
    name: 'Youtube',
    icon: <Youtube />,
    disabled: true,
  },
  { name: 'WooCommerce', icon: <ShoppingCart />, disabled: true },
];
