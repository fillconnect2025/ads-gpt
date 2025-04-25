export interface IListIntegration {
  name: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export interface ISelectedAccount {
  id: string;
  account_id: number;
}

export interface IIntegrationQtd {
  adAccountQtd: number;
  campaignQtd: number;
  adQtd: number;
}
