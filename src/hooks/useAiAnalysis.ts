import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IAdsAnalysis } from '@/@types/supabase';
import { IAiAnalysisFormData } from '@/@types/integrations.type';
import { analysisService } from '@/services/analysisService';
import { simulateAnalysisProcess, generateMockMetrics, generateMockInsights, generateAnalysisScore } from '@/utils/ragHelpers';
import { useToast } from '@/hooks/use-toast';

interface UseAiAnalysisProps {
  userId: string;
}

export const useAiAnalysis = ({ userId }: UseAiAnalysisProps) => {
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to get all analyses
  const {
    data: analysisList,
    isLoading: isLoadingAnalyses,
    error: analysesError,
    refetch: refetchAnalyses
  } = useQuery({
    queryKey: ['aiAnalyses', userId],
    queryFn: async () => {
      const response = await analysisService.getAnalysisList(userId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch analyses');
      }
      return response.data || [];
    },
    initialData: generateMockAnalysisList(), // Add mock data initially
    enabled: !!userId
  });

  // Query to get a specific analysis
  const {
    data: selectedAnalysis,
    isLoading: isLoadingSelectedAnalysis,
    refetch: refetchSelectedAnalysis
  } = useQuery({
    queryKey: ['aiAnalysis', selectedAnalysisId],
    queryFn: async () => {
      if (!selectedAnalysisId) return null;
      const response = await analysisService.getAnalysisById(selectedAnalysisId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch analysis');
      }
      return response.data || null;
    },
    enabled: !!selectedAnalysisId
  });

  // Mutation to submit a new analysis
  const submitAnalysisMutation = useMutation({
    mutationFn: async (formData: IAiAnalysisFormData) => {
      const response = await analysisService.submitAnalysis(userId, formData);
      if (!response.success) {
        throw new Error(response.message || 'Failed to submit analysis');
      }
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        setSelectedAnalysisId(data.id);
        toast({
          title: "Análise iniciada",
          description: "Sua análise de campanha foi iniciada com sucesso."
        });
        
        // Simulate the AI analysis process
        simulateAnalysisProcess(
          data.id,
          async (status, progress) => {
            setAnalysisProgress(progress);
            
            // Update status in database
            await analysisService.updateAnalysisStatus(data.id, status as IAdsAnalysis['status']);
            
            // If completed, generate mock results
            if (status === 'completed') {
              // In a real app, this would be done by the backend
              // For demo purposes, we're generating mock data
              setTimeout(() => {
                refetchSelectedAnalysis();
                refetchAnalyses();
              }, 1000);
            }
          }
        );
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao iniciar análise",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Mutation to submit a rating
  const submitRatingMutation = useMutation({
    mutationFn: async ({ id, rating }: { id: string; rating: number }) => {
      const response = await analysisService.submitRating(id, rating);
      if (!response.success) {
        throw new Error(response.message || 'Failed to submit rating');
      }
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Feedback enviado",
        description: "Obrigado pelo seu feedback."
      });
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['aiAnalysis', selectedAnalysisId] });
      queryClient.invalidateQueries({ queryKey: ['aiAnalyses', userId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar feedback",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Handle selecting an analysis
  const selectAnalysis = useCallback((id: string) => {
    setSelectedAnalysisId(id);
  }, []);

  // Clear selected analysis
  const clearSelectedAnalysis = useCallback(() => {
    setSelectedAnalysisId(null);
    setAnalysisProgress(0);
  }, []);

  // Submit a new analysis
  const submitAnalysis = useCallback((formData: IAiAnalysisFormData) => {
    submitAnalysisMutation.mutate(formData);
  }, [submitAnalysisMutation]);

  // Submit a rating for an analysis
  const submitRating = useCallback((id: string, rating: number) => {
    submitRatingMutation.mutate({ id, rating });
  }, [submitRatingMutation]);

  return {
    analysisList,
    selectedAnalysis,
    isLoadingAnalyses,
    isLoadingSelectedAnalysis,
    analysisProgress,
    submitAnalysis,
    selectAnalysis,
    clearSelectedAnalysis,
    submitRating,
    isSubmitting: submitAnalysisMutation.isPending,
    refetchAnalyses
  };
};
