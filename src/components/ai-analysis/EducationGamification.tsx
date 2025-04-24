
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, AlertTriangle, Award } from "lucide-react";
import { cn } from '@/lib/utils';

interface EducationGamificationProps {
  analysisScore?: number;
  analysisStatus?: string;
  checklistItems?: {
    id: string;
    label: string;
    completed: boolean;
  }[];
}

const EducationGamification: React.FC<EducationGamificationProps> = ({
  analysisScore = 0,
  analysisStatus = 'pending',
  checklistItems = [
    { id: 'analysis_started', label: 'Análise iniciada', completed: false },
    { id: 'report_viewed', label: 'Relatório lido', completed: false },
    { id: 'actions_applied', label: 'Ações aplicadas', completed: false },
    { id: 'shared_team', label: 'Compartilhado com equipe', completed: false },
  ]
}) => {
  // Helper function to determine score classification and color
  const getScoreClassification = (score: number) => {
    if (score >= 80) return { emoji: '🟢', text: 'Excelente', color: 'text-green-600' };
    if (score >= 60) return { emoji: '🟡', text: 'Satisfatório', color: 'text-yellow-600' };
    return { emoji: '🔴', text: 'Atenção Necessária', color: 'text-red-600' };
  };

  const scoreInfo = getScoreClassification(analysisScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Checklist de Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {checklistItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
                <span className={item.completed ? 'text-green-800' : 'text-gray-600'}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 border-t pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Complete todas as etapas para maximizar resultados
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-indigo-100 to-purple-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-700" />
            ADS-GPT Score
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {analysisStatus === 'completed' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold">{analysisScore}/100</div>
                <div className={cn("text-3xl", scoreInfo.color)}>{scoreInfo.emoji}</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={cn(
                    "h-2.5 rounded-full",
                    analysisScore >= 80 ? "bg-green-600" : 
                    analysisScore >= 60 ? "bg-yellow-500" : 
                    "bg-red-600"
                  )}
                  style={{ width: `${analysisScore}%` }}
                ></div>
              </div>
              
              <p className={cn("mt-2 text-center font-medium", scoreInfo.color)}>
                {scoreInfo.text}
              </p>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Esta pontuação considera:</p>
                <ul className="list-disc ml-5 mt-1">
                  <li>Eficiência de orçamento</li>
                  <li>Desempenho de conversões</li>
                  <li>Relevância da segmentação</li>
                  <li>Qualidade dos criativos</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
              <p className="text-center text-muted-foreground">
                Complete a análise para ver sua pontuação
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationGamification;
