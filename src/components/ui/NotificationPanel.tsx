
import React, { useState } from 'react';
import { X, Bell, AlertTriangle, CheckCircle, BarChart, Info, DollarSign } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

type NotificationType = 'info' | 'warning' | 'success' | 'campaign' | 'budget';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'campaign':
      return <BarChart className="w-5 h-5 text-purple-500" />;
    case 'budget':
      return <DollarSign className="w-5 h-5 text-emerald-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  open,
  onClose,
  notifications,
  onNotificationRead,
  onClearAll
}) => {
  const { toast } = useToast();
  const unreadCount = notifications.filter(n => !n.read).length;

  // For mobile devices, we'll use Sheet component from shadcn
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <SheetContent className="p-0 max-w-full sm:max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-medium">Notificações</h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {notifications.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    onClearAll();
                    toast({
                      title: "Notificações limpas",
                      description: "Todas as notificações foram removidas"
                    });
                  }}
                  className="text-xs h-8"
                >
                  Limpar tudo
                </Button>
              )}
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[80vh]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Bell className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-1">Nenhuma notificação</h3>
                <p className="text-muted-foreground text-sm">
                  Você não tem nenhuma notificação no momento.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors relative ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                    onClick={() => onNotificationRead(notification.id)}
                  >
                    {!notification.read && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></span>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-sm font-medium line-clamp-1">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // For desktop, we'll use a more traditional dropdown
  if (!open) return null;

  return (
    <div className="fixed right-4 top-16 z-50 w-full max-w-sm">
      <Card className="shadow-lg animate-in slide-in-from-top-5 duration-200">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-medium">Notificações</h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  onClearAll();
                  toast({
                    title: "Notificações limpas",
                    description: "Todas as notificações foram removidas"
                  });
                }}
                className="text-xs h-8"
              >
                Limpar tudo
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">Nenhuma notificação</h3>
              <p className="text-muted-foreground text-sm">
                Você não tem nenhuma notificação no momento.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors relative ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => onNotificationRead(notification.id)}
                >
                  {!notification.read && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></span>
                  )}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-muted">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-sm font-medium line-clamp-1">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationPanel;
