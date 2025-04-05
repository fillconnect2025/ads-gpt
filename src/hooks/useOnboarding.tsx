import { BarChart, Check, FileText, Rocket, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  {
    title: 'Bem-vindo ao Ads-GPT',
    description:
      'Seu assistente de marketing inteligente que otimiza suas campanhas publicitárias com IA.',
    icon: Rocket,
    content: (
      <div className="flex justify-center py-8">
        <img
          src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
          alt="Ads-GPT Logo"
          className="h-24 w-auto animate-fade-in"
        />
      </div>
    ),
  },
  {
    title: 'Crie Campanhas',
    description:
      'Configure suas campanhas publicitárias com alguns cliques. Nossa IA cuida do resto.',
    icon: Target,
    content: (
      <div className="border rounded-lg p-4 bg-muted/30 my-4 animate-fade-in">
        <div className="space-y-3">
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-full bg-muted rounded"></div>
          <div className="h-24 w-full bg-muted rounded"></div>
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-primary/30 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Analise Resultados',
    description:
      'Veja o desempenho de suas campanhas com análises detalhadas e visuais claros.',
    icon: BarChart,
    content: (
      <div className="border rounded-lg p-4 bg-muted/30 my-4 flex justify-center items-center animate-fade-in">
        <div className="h-40 w-full flex items-end space-x-2 justify-center">
          <div className="h-20 w-6 bg-blue-200 rounded-t"></div>
          <div className="h-32 w-6 bg-blue-300 rounded-t"></div>
          <div className="h-24 w-6 bg-blue-400 rounded-t"></div>
          <div className="h-36 w-6 bg-blue-500 rounded-t"></div>
          <div className="h-28 w-6 bg-blue-600 rounded-t"></div>
          <div className="h-16 w-6 bg-blue-700 rounded-t"></div>
          <div className="h-30 w-6 bg-blue-800 rounded-t"></div>
        </div>
      </div>
    ),
  },
  {
    title: 'Gere Relatórios',
    description:
      'Exporte relatórios completos para compartilhar com sua equipe ou clientes.',
    icon: FileText,
    content: (
      <div className="border rounded-lg p-4 bg-muted/30 my-4 animate-fade-in">
        <div className="space-y-2">
          <div className="h-6 w-1/2 bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
          <div className="flex justify-between mt-4">
            <div className="h-8 w-24 bg-muted rounded"></div>
            <div className="h-8 w-24 bg-primary/30 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Comece Agora!',
    description:
      'Você está pronto para revolucionar suas campanhas publicitárias com a ajuda da IA.',
    icon: Check,
    content: (
      <div className="text-center py-4 animate-fade-in">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <p className="text-muted-foreground">
          Estamos animados para ajudá-lo a alcançar resultados incríveis!
        </p>
      </div>
    ),
  },
];

export const useOnboarding = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Verificar se é a primeira visita do usuário
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    console.log("hasSeenOnboarding ", hasSeenOnboarding)
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setOpen(false);
  };

  const StepIcon = steps[currentStep].icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    open,
    steps,
    StepIcon,
    currentStep,
    progress,
    completeOnboarding,
    handlePrevious,
    handleNext,
  };
};
