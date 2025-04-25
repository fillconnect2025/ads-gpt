
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, BarChart, Target, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisProgressProps {
  status: string;
  progress: number;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ status, progress }) => {
  const steps = [
    { id: 'collecting', label: 'Coletando dados da campanha...', icon: Target, threshold: 20 },
    { id: 'processing', label: 'Processando métricas principais...', icon: BarChart, threshold: 40 },
    { id: 'evaluating', label: 'Avaliando desempenho e padrões...', icon: CheckCircle, threshold: 60 },
    { id: 'personalizing', label: 'Aplicando inteligência RAG personalizada...', icon: Brain, threshold: 80 },
    { id: 'completed', label: 'Análise concluída', icon: CheckCircle, threshold: 100 },
  ];

  const getStepState = (stepId: string): 'completed' | 'current' | 'pending' => {
    const currentStepIndex = steps.findIndex(step => step.id === status);
    const stepIndex = steps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Processando Análise</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-8">
          {steps.map((step) => {
            const stepState = getStepState(step.id);
            const StepIcon = step.icon;
            
            return (
              <div 
                key={step.id} 
                className={cn(
                  "flex items-start gap-3 transition-opacity",
                  stepState === 'pending' ? "opacity-40" : "opacity-100"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full flex-shrink-0",
                  stepState === 'completed' ? "bg-green-100" : 
                  stepState === 'current' ? "bg-blue-100 animate-pulse" : 
                  "bg-gray-100"
                )}>
                  <StepIcon className={cn(
                    "h-5 w-5",
                    stepState === 'completed' ? "text-green-600" :
                    stepState === 'current' ? "text-blue-600" :
                    "text-gray-500"
                  )} />
                </div>
                
                <div className="flex flex-col">
                  <span className={cn(
                    "font-medium",
                    stepState === 'completed' ? "text-green-700" :
                    stepState === 'current' ? "text-blue-700" :
                    "text-gray-700"
                  )}>
                    {step.label}
                  </span>
                  
                  {stepState === 'current' && (
                    <div className="relative mt-2 h-6 overflow-hidden">
                      <div className="typing-animation font-mono text-xs text-gray-500">
                        {step.id === 'collecting' && "Buscando dados de métricas..."}
                        {step.id === 'processing' && "Calculando CPM, CPC, CTR, ROAS..."}
                        {step.id === 'evaluating' && "Identificando padrões de desempenho..."}
                        {step.id === 'personalizing' && "Gerando insights personalizados..."}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisProgress;
