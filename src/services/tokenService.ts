
import { PlanType } from '@/context/TokenContext';

// Track token usage for different actions
export const trackTokenUsage = (action: 'report' | 'analysis', entityId?: string) => {
  // Get existing tracking data
  const storedTrackingData = localStorage.getItem('tokenTrackingData');
  const trackingData = storedTrackingData 
    ? JSON.parse(storedTrackingData) 
    : { reports: [], analysis: [] };
  
  const timestamp = new Date().toISOString();
  
  // Add new tracking entry
  if (action === 'report') {
    trackingData.reports.push({ 
      id: entityId || generateId(), 
      timestamp,
    });
  } else if (action === 'analysis') {
    trackingData.analysis.push({ 
      id: entityId || generateId(), 
      timestamp,
    });
  }
  
  // Save updated tracking data
  localStorage.setItem('tokenTrackingData', JSON.stringify(trackingData));
};

// Get token usage history
export const getTokenUsageHistory = () => {
  const storedTrackingData = localStorage.getItem('tokenTrackingData');
  return storedTrackingData 
    ? JSON.parse(storedTrackingData) 
    : { reports: [], analysis: [] };
};

// Get token limits based on plan
export const getTokenLimits = (plan: PlanType) => {
  switch (plan) {
    case 'lite':
      return {
        maxTokens: 100,
        maxAccounts: 1,
        maxCampaigns: 5
      };
    case 'plus':
      return {
        maxTokens: 500,
        maxAccounts: 3,
        maxCampaigns: 15
      };
    case 'prime':
      return {
        maxTokens: 2000,
        maxAccounts: 5,
        maxCampaigns: 30
      };
    default:
      return {
        maxTokens: 100,
        maxAccounts: 1,
        maxCampaigns: 5
      };
  }
};

// Helper to generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
