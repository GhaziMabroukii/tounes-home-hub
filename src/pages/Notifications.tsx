import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  MessageSquare, 
  Home, 
  Heart,
  Calendar,
  DollarSign,
  User,
  Settings,
  Trash2,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    messages: true,
    favorites: true,
    contracts: true,
    payments: true,
    newProperties: false,
    marketing: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: "message",
      title: "Nouveau message",
      description: "Ahmed Karim a répondu à votre demande de visite",
      timestamp: "2024-01-15T14:30:00Z",
      read: false,
      avatar: "AK",
      action: "/messages?contact=Ahmed Karim"
    },
    {
      id: 2,
      type: "favorite",
      title: "Nouveau bien favori",
      description: "Un nouveau studio près de votre université est disponible",
      timestamp: "2024-01-15T10:15:00Z",
      read: false,
      avatar: null,
      action: "/search?near=university"
    },
    {
      id: 3,
      type: "contract",
      title: "Contrat à signer",
      description: "Votre contrat pour le studio INSAT est prêt pour signature",
      timestamp: "2024-01-14T16:45:00Z",
      read: true,
      avatar: null,
      action: "/contracts"
    },
    {
      id: 4,
      type: "payment",
      title: "Rappel de paiement",
      description: "Votre loyer de février est dû dans 5 jours",
      timestamp: "2024-01-13T09:00:00Z",
      read: true,
      avatar: null,
      action: "/contracts"
    },
    {
      id: 5,
      type: "property",
      title: "Bien ajouté",
      description: "Votre studio a été publié avec succès",
      timestamp: "2024-01-12T11:20:00Z",
      read: true,
      avatar: null,
      action: "/dashboard"
    },
    {
      id: 6,
      type: "visit",
      title: "Demande de visite",
      description: "Amira Ben Said souhaite visiter votre villa",
      timestamp: "2024-01-11T15:30:00Z",
      read: true,
      avatar: "AB",
      action: "/messages?contact=Amira Ben Said"
    }
  ];

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    // Load notifications from localStorage or use mock data
    const savedNotifications = localStorage.getItem("userNotifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem("userNotifications", JSON.stringify(mockNotifications));
    }

    // Load notification settings
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [navigate]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4 text-accent" />;
      case "favorite": return <Heart className="h-4 w-4 text-destructive" />;
      case "contract": return <Calendar className="h-4 w-4 text-primary" />;
      case "payment": return <DollarSign className="h-4 w-4 text-warning" />;
      case "property": return <Home className="h-4 w-4 text-success" />;
      case "visit": return <User className="h-4 w-4 text-primary" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;
    
    return time.toLocaleDateString('fr-FR');
  };

  const markAsRead = (notificationId: number) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("userNotifications", JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem("userNotifications", JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notifications marquées",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const deleteNotification = (notificationId: number) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
    setNotifications(updatedNotifications);
    localStorage.setItem("userNotifications", JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée",
    });
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.action) {
      navigate(notification.action);
    }
  };

  const updateSetting = (key: string, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(updatedSettings));
    
    toast({
      title: "Paramètres mis à jour",
      description: `Les notifications ${key} ont été ${value ? 'activées' : 'désactivées'}`,
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center space-x-3">
              <Bell className="h-8 w-8 text-primary" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              {notifications.length} notification(s) • {unreadCount} non lue(s)
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Tout marquer comme lu</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`glass-card cursor-pointer hover:scale-[1.02] transition-transform ${
                    !notification.read ? 'border-primary/50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Icon/Avatar */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{notification.avatar}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 glass-card rounded-full flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {getTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune notification</h3>
                <p className="text-muted-foreground">
                  Vous êtes à jour ! Aucune nouvelle notification.
                </p>
              </div>
            )}
          </div>

          {/* Settings Sidebar */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres de notification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">Nouveaux messages et réponses</p>
                  </div>
                  <Switch 
                    checked={settings.messages}
                    onCheckedChange={(checked) => updateSetting('messages', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Favoris</p>
                    <p className="text-sm text-muted-foreground">Nouveaux biens près de vos favoris</p>
                  </div>
                  <Switch 
                    checked={settings.favorites}
                    onCheckedChange={(checked) => updateSetting('favorites', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contrats</p>
                    <p className="text-sm text-muted-foreground">Signature et renouvellement</p>
                  </div>
                  <Switch 
                    checked={settings.contracts}
                    onCheckedChange={(checked) => updateSetting('contracts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Paiements</p>
                    <p className="text-sm text-muted-foreground">Rappels et confirmations</p>
                  </div>
                  <Switch 
                    checked={settings.payments}
                    onCheckedChange={(checked) => updateSetting('payments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nouveaux biens</p>
                    <p className="text-sm text-muted-foreground">Recommandations personnalisées</p>
                  </div>
                  <Switch 
                    checked={settings.newProperties}
                    onCheckedChange={(checked) => updateSetting('newProperties', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing</p>
                    <p className="text-sm text-muted-foreground">Offres et promotions</p>
                  </div>
                  <Switch 
                    checked={settings.marketing}
                    onCheckedChange={(checked) => updateSetting('marketing', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;