
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NotificationPanel, { Notification } from './NotificationPanel';

interface NotificationButtonProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  notifications,
  onNotificationRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Closing the notification panel
  const handleClose = () => {
    setIsOpen(false);
  };

  // Handler for clicking the notification button
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleNotifications}
        className="relative"
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        <span className="sr-only">Notificações</span>
      </Button>

      <NotificationPanel 
        open={isOpen}
        onClose={handleClose}
        notifications={notifications}
        onNotificationRead={onNotificationRead}
        onClearAll={onClearAll}
      />
    </>
  );
};

export default NotificationButton;
