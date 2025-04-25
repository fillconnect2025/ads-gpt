
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IAdsAnalysis } from '@/@types/supabase';
import { getStatusInfo } from '@/utils/ragHelpers';
import { BarChart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalysisHistoryTableProps {
  analyses: IAdsAnalysis[];
  isLoading: boolean;
  onViewAnalysis: (id: string) => void;
}

const AnalysisHistoryTable: React.FC<AnalysisHistoryTableProps> = ({ 
  analyses, 
  isLoading, 
  onViewAnalysis 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <BarChart className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Nenhuma análise encontrada</h3>
        <p className="text-muted-foreground mb-6">
          Você ainda não submeteu nenhuma campanha para análise com I.A.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Data da Análise</TableHead>
          <TableHead className="text-center">Pontuação</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses.map((analysis) => {
          const statusInfo = getStatusInfo(analysis.status);
          
          return (
            <TableRow key={analysis.id}>
              <TableCell className="font-medium">{analysis.campaign_name}</TableCell>
              <TableCell>
                {new Date(analysis.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </TableCell>
              <TableCell className="text-center">
                {analysis.status === 'completed' ? (
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    analysis.score >= 80 ? "bg-green-100 text-green-800" :
                    analysis.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  )}>
                    {analysis.score}/100
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewAnalysis(analysis.id)}
                  disabled={analysis.status !== 'completed'}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalhes
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AnalysisHistoryTable;
