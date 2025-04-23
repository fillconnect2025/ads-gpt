
export interface IListIntegration  {
  name: string
  icon: React.ReactNode
  disabled?: boolean
}

export interface ICampaignObjective {
  value: string;
  label: string;
}

export interface IAiAnalysisFormData {
  campaign_name: string;
  start_date: string;
  end_date: string;
  objective: string;
  data_source: 'csv' | 'api';
  file?: File;
}
