
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, TextIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const FontSizeAdjuster = () => {
  const [fontSize, setFontSize] = useState(100); // 100% é o padrão
  const { toast } = useToast();
  
  useEffect(() => {
    // Buscar o tamanho da fonte salvo no localStorage
    const savedFontSize = Number(localStorage.getItem('fontSizePercentage'));
    if (savedFontSize && !isNaN(savedFontSize)) {
      setFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
  }, []);
  
  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size}%`;
    localStorage.setItem('fontSizePercentage', size.toString());
  };
  
  const increaseFontSize = () => {
    if (fontSize < 130) { // Limite máximo
      const newSize = fontSize + 5;
      setFontSize(newSize);
      applyFontSize(newSize);
      toast({
        title: "Tamanho de fonte ajustado",
        description: `Fonte aumentada para ${newSize}%`,
      });
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 80) { // Limite mínimo
      const newSize = fontSize - 5;
      setFontSize(newSize);
      applyFontSize(newSize);
      toast({
        title: "Tamanho de fonte ajustado",
        description: `Fonte diminuída para ${newSize}%`,
      });
    }
  };
  
  const resetFontSize = () => {
    setFontSize(100);
    applyFontSize(100);
    toast({
      title: "Tamanho de fonte ajustado",
      description: "Fonte restaurada para o tamanho padrão",
    });
  };
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={decreaseFontSize}
              disabled={fontSize <= 80}
              aria-label="Diminuir tamanho da fonte"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Diminuir texto</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFontSize}
              aria-label="Restaurar tamanho da fonte"
              className="px-2"
            >
              <TextIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{fontSize}%</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restaurar tamanho padrão</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={increaseFontSize}
              disabled={fontSize >= 130}
              aria-label="Aumentar tamanho da fonte"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Aumentar texto</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FontSizeAdjuster;
