import { IAdsAnalysis, ICampaignMetrics, ICampaignInsights } from '@/@types/supabase';
import { IAiAnalysisFormData } from '@/@types/integrations.type';
import { supabase } from '@/utils/supabase';
import { generateMockAnalysis, generateMockAnalysisList } from '@/utils/mockAnalysis';

export interface IAnalysisResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

class AnalysisService {
  async getAnalysisList(userId: string) {
    try {
      // For demonstration, using mock data
      const mockData = generateMockAnalysisList(5);
      return {
        success: true,
        data: mockData,
        message: 'Analysis list retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching analysis list:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Failed to fetch analyses'
      };
    }
  }

  async getAnalysisById(id: string) {
    try {
      // For demonstration, using mock data
      const mockData = generateMockAnalysis();
      mockData.id = id;
      return {
        success: true,
        data: mockData,
        message: 'Analysis retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching analysis:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Failed to fetch analysis'
      };
    }
  }

  async submitAnalysis(
    userId: string,
    formData: IAiAnalysisFormData
  ): Promise<IAnalysisResponse<IAdsAnalysis>> {
    try {
      // Step 1: Create the initial analysis record
      const { data, error } = await supabase
        .from('ads_analysis')
        .insert({
          user_id: userId,
          campaign_name: formData.campaign_name,
          start_date: formData.start_date,
          end_date: formData.end_date,
          objective: formData.objective,
          status: 'collecting',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating analysis:', error);
        return {
          success: false,
          message: error.message,
        };
      }

      // In a real implementation, this would trigger a backend process
      // Here we simulate the process with timeout

      return {
        success: true,
        data: data as IAdsAnalysis,
      };
    } catch (error: any) {
      console.error('Error submitting analysis:', error);
      return {
        success: false,
        message: 'Failed to submit analysis',
      };
    }
  }

  async updateAnalysisStatus(
    id: string,
    status: IAdsAnalysis['status']
  ): Promise<IAnalysisResponse<void>> {
    try {
      const { error } = await supabase
        .from('ads_analysis')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Error updating analysis status:', error);
      return {
        success: false,
        message: 'Failed to update analysis status',
      };
    }
  }

  async submitRating(
    id: string,
    rating: number
  ): Promise<IAnalysisResponse<void>> {
    try {
      const { error } = await supabase
        .from('ads_analysis')
        .update({
          rating,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      return {
        success: false,
        message: 'Failed to submit rating',
      };
    }
  }
}

export const analysisService = new AnalysisService();
