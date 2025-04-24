
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Lightbulb } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useTokens } from '@/context/TokenContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AiChatSupportProps {
  analysisId?: string;
  onClose: () => void;
}

const commonQuestions = [
  "Por que meu CPC está alto?",
  "Como melhorar minha taxa de conversão?",
  "Qual seria a melhor segmentação?",
  "Como reduzir o CPM da campanha?",
];

const AiChatSupport: React.FC<AiChatSupportProps> = ({ analysisId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Olá, posso ajudar a interpretar sua análise? Fique à vontade para perguntar sobre métricas, estratégias ou resultados.",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const { tokens, consumeToken } = useTokens();
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Check if user has enough tokens
    if (tokens < 1) {
      toast({
        title: "Tokens insuficientes",
        description: "Você precisa de pelo menos 1 token para fazer perguntas à IA.",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Consume token
    consumeToken();
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAiResponse(input, analysisId);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple AI response generator - in production, this would connect to your LLM
  const generateAiResponse = (query: string, analysisId?: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('cpc') && lowercaseQuery.includes('alto')) {
      return "Seu CPC pode estar elevado por alguns motivos: 1) Segmentação muito ampla, 2) Baixa qualidade dos criativos, ou 3) Alta competição no nicho. Recomendo testar uma segmentação mais específica e revisar seus criativos. Confira nosso artigo sobre 'Redução de CPC' no blog.";
    }
    
    if (lowercaseQuery.includes('conversão') || lowercaseQuery.includes('conversao')) {
      return "Para melhorar sua taxa de conversão, foque em: 1) Landing pages otimizadas, 2) Call-to-actions claros, e 3) Remarketing para quem já interagiu. Os dados indicam que testar múltiplas variações de página pode aumentar conversões em até 30%.";
    }
    
    if (lowercaseQuery.includes('segmentação') || lowercaseQuery.includes('segmentacao')) {
      return "A melhor segmentação geralmente é aquela que equilibra alcance e especificidade. Com base em dados de campanhas similares, recomendo focar em interesses específicos combinados com dados demográficos precisos. Por exemplo, para seu produto, o público de 25-34 anos com interesses em tecnologia tem apresentado melhor ROAS.";
    }
    
    if (lowercaseQuery.includes('cpm')) {
      return "Para reduzir o CPM da sua campanha, experimente: 1) Melhorar a relevância do anúncio para seu público, 2) Ajustar horários de veiculação para períodos menos concorridos, e 3) Testar diferentes formatos de anúncios. Campanhas com vídeos curtos têm mostrado CPMs 15-20% menores que imagens estáticas.";
    }
    
    return "Obrigado pela pergunta! Para dar uma resposta mais precisa, eu precisaria de mais contexto sobre sua campanha específica. Poderia fornecer detalhes adicionais sobre seus objetivos, métricas atuais ou desafios específicos?";
  };
  
  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] shadow-lg flex flex-col z-50">
      <CardHeader className="bg-purple-100 text-purple-800 flex flex-row justify-between items-center p-3">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-purple-600">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">Suporte IA</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <span className="flex items-center">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse mr-1"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </div>
          </div>
        )}
      </CardContent>
      
      <div className="px-3 py-2">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {commonQuestions.map((question) => (
            <Button 
              key={question} 
              variant="outline" 
              size="sm" 
              className="whitespace-nowrap text-xs"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
      
      <CardFooter className="p-3 pt-0">
        <div className="flex w-full gap-2 items-center">
          <Input
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={!input.trim() || tokens < 1}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full text-xs text-right mt-1 text-muted-foreground">
          1 token por pergunta • {tokens} disponíveis
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiChatSupport;
