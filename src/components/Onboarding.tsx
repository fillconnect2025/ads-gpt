import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useOnboarding } from '@/hooks/useOnboarding';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Onboarding = () => {
  const {
    open,
    steps,
    StepIcon,
    currentStep,
    progress,
    completeOnboarding,
    handlePrevious,
    handleNext,
  } = useOnboarding();

  return (
    <Dialog open={open} onOpenChange={completeOnboarding}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <StepIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>{steps[currentStep].title}</DialogTitle>
              <DialogDescription className="mt-1">
                {steps[currentStep].description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-2">{steps[currentStep].content}</div>

        <Progress value={progress} className="h-2 mb-2" />

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            Passo {currentStep + 1} de {steps.length}
          </span>
          {currentStep < steps.length - 1 ? (
            <button
              className="text-primary hover:underline text-xs"
              onClick={completeOnboarding}
            >
              Pular tutorial
            </button>
          ) : null}
        </div>

        <DialogFooter className="flex justify-between items-center mt-4 gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={cn('px-4', currentStep === 0 ? 'invisible' : '')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          <Button onClick={handleNext} className="px-4">
            {currentStep < steps.length - 1 ? (
              <>
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              'Começar a usar!'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Onboarding;
