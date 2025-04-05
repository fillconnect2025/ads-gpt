
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification } from '@/components/ui/NotificationPanel';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Desempenho acima da média',
    message: 'Sua campanha "Promoção de Verão" está performando 35% acima da média do segmento.',
    type: 'success',
    time: '2 horas atrás',
    read: false
  },
  {
    id: '2',
    title: 'Orçamento quase esgotado',
    message: 'O orçamento da campanha "Black Friday" está prestes a se esgotar (85% utilizado).',
    type: 'budget',
    time: '5 horas atrás',
    read: false
  },
  {
    id: '3',
    title: 'Relatório semanal disponível',
    message: 'O relatório semanal de suas campanhas já está disponível para visualização.',
    type: 'info',
    time: '1 dia atrás',
    read: true
  },
  {
    id: '4',
    title: 'Alerta de baixa performance',
    message: 'A campanha "Lançamento Produto XYZ" está com desempenho abaixo do esperado.',
    type: 'warning',
    time: '2 dias atrás',
    read: true
  }
];

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const { toast } = useToast();

  // Adicionar uma nova notificação
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Agora mesmo',
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Mostrar toast para notificação em tempo real
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });
  }, [toast]);

  // Marcar uma notificação como lida
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }, []);

  // Limpar todas as notificações
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Adicionar notificação simulada periodicamente (apenas para demonstração)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const addRandomNotification = () => {
      const types: Array<Notification['type']> = ['info', 'warning', 'success', 'campaign', 'budget'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const titles = {
        info: 'Nova funcionalidade disponível',
        warning: 'Alerta de campanha',
        success: 'Meta atingida',
        campaign: 'Análise de campanha atualizada',
        budget: 'Atualização de orçamento'
      };
      
      const messages = {
        info: 'Uma nova funcionalidade foi adicionada à plataforma. Confira!',
        warning: 'Uma de suas campanhas precisa de atenção imediata.',
        success: 'Parabéns! Sua campanha atingiu a meta estabelecida.',
        campaign: 'Novas insights disponíveis para sua campanha principal.',
        budget: 'Seu orçamento foi atualizado conforme solicitado.'
      };
      
      addNotification({
        title: titles[randomType],
        message: messages[randomType],
        type: randomType
      });
      
      // Agendar a próxima notificação em um intervalo aleatório (entre 2 e 5 minutos)
      const nextInterval = Math.floor(Math.random() * (300000 - 120000) + 120000);
      timeout = setTimeout(addRandomNotification, nextInterval);
    };
    
    // Primeira notificação após 3 minutos
    timeout = setTimeout(addRandomNotification, 180000);
    
    return () => clearTimeout(timeout);
  }, [addNotification]);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        clearAll 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
};
