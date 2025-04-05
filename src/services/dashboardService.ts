import apiClient from './apiClient';

export const dashboardService = {
  // Get dashboard data
  getDashboardData: async () => {
    try {
      const response = await apiClient.get('/dashboard/data');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      return {
        success: false,
        message: 'Failed to fetch dashboard data',
      };
    }
  },
  
  // Get user stats
  getUserStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
      return {
        success: false,
        message: 'Failed to fetch user stats',
      };
    }
  },
  
  // Get activities
  getActivities: async () => {
    try {
      const response = await apiClient.get('/dashboard/activities');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      return {
        success: false,
        message: 'Failed to fetch activity data',
      };
    }
  },

  // Get notifications
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/dashboard/notifications');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      return {
        success: false,
        message: 'Failed to fetch notifications',
      };
    }
  }
};
