
import { useToast } from '@/hooks/use-toast';
import { dashboardService } from '@/services/dashboardService';
import { useState } from 'react';

export const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await dashboardService.getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
        setStats(response.data.stats);
        setActivities(response.data.activities);
        setNotifications(response.data.notifications);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to load dashboard",
          description: "Could not load dashboard data. Please try again.",
        });
      }
    } catch (error) {
      console.error('Dashboard data error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while loading dashboard data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await dashboardService.getUserStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Stats error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await dashboardService.getActivities();
      if (response.success) {
        setActivities(response.data);
      }
    } catch (error) {
      console.error('Activities error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await dashboardService.getNotifications();
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Notifications error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    dashboardData,
    stats,
    activities,
    notifications,
    fetchDashboardData,
    fetchStats,
    fetchActivities,
    fetchNotifications
  };
};