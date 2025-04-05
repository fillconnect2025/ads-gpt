
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface WhatsAppSupportProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppSupport: React.FC<WhatsAppSupportProps> = ({ 
  phoneNumber, 
  message = "Olá! Preciso de ajuda com o Ads-GPT." 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Criar a URL do WhatsApp com o número e mensagem
  const getWhatsAppUrl = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Parar a animação de pulso quando hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPulsing(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reiniciar pulsação após um curto atraso
    setTimeout(() => {
      setIsPulsing(true);
    }, 500);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 
                         bg-green-500 rounded-full shadow-lg hover:bg-green-600
                         transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsPulsing(false)}
          >
            <div className={`absolute inset-0 rounded-full bg-green-500 
                             ${isPulsing ? 'animate-ping opacity-75' : 'opacity-0'}`} />
            <MessageCircle className="text-white h-6 w-6 z-10" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" className="mr-2">
          <p>Fale conosco pelo WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppSupport;
