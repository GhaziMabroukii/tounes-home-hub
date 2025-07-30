import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Image as ImageIcon
} from "lucide-react";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const contactParam = searchParams.get("contact");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    // If coming from property page, auto-select the chat
    if (contactParam && mockChats.length > 0) {
      setSelectedChat(1);
    }
  }, [navigate, contactParam]);

  // Mock chats data
  const mockChats = [
    {
      id: 1,
      name: "Ahmed Karim",
      avatar: "AK",
      lastMessage: "Le studio est toujours disponible, quand souhaitez-vous visiter ?",
      lastMessageTime: "14:30",
      unreadCount: 2,
      online: true,
      property: "Studio moderne près INSAT",
      propertyPrice: "450 TND/mois"
    },
    {
      id: 2,
      name: "Fatma Ben Ali",
      avatar: "FB",
      lastMessage: "Merci pour votre intérêt, je vous envoie plus de photos",
      lastMessageTime: "12:15",
      unreadCount: 0,
      online: false,
      property: "Appartement 2 pièces",
      propertyPrice: "680 TND/mois"
    },
    {
      id: 3,
      name: "Mohamed Trabelsi",
      avatar: "MT",
      lastMessage: "La visite est confirmée pour demain à 15h",
      lastMessageTime: "Hier",
      unreadCount: 1,
      online: true,
      property: "Villa avec jardin",
      propertyPrice: "1200 TND/mois"
    }
  ];

  // Mock messages for selected chat
  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Ahmed Karim",
      message: "Bonjour ! Je vois que vous êtes intéressé par mon studio près de l'INSAT.",
      timestamp: "14:25",
      isOwn: false
    },
    {
      id: 2,
      senderId: "me",
      senderName: "Moi",
      message: "Bonjour, oui exactement ! Le studio est-il toujours disponible ?",
      timestamp: "14:27",
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Ahmed Karim",
      message: "Oui il est disponible ! Souhaiteriez-vous programmer une visite ? Je suis libre ce week-end.",
      timestamp: "14:28",
      isOwn: false
    },
    {
      id: 4,
      senderId: 1,
      senderName: "Ahmed Karim",
      message: "Le studio est toujours disponible, quand souhaitez-vous visiter ?",
      timestamp: "14:30",
      isOwn: false
    }
  ];

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <Card className="glass-card lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-white/5 transition-colors ${
                      selectedChat === chat.id ? 'bg-white/10 border-r-2 border-primary' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{chat.avatar}</AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                            {chat.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 text-xs">{chat.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        <div className="mt-1">
                          <p className="text-xs text-primary font-medium">{chat.property}</p>
                          <p className="text-xs text-muted-foreground">{chat.propertyPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="glass-card lg:col-span-2">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{selectedChatData.avatar}</AvatarFallback>
                        </Avatar>
                        {selectedChatData.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedChatData.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChatData.online ? "En ligne" : "Hors ligne"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Property Info */}
                  <div className="mt-3 p-3 glass-card rounded-lg">
                    <p className="text-sm font-medium">{selectedChatData.property}</p>
                    <p className="text-xs text-primary">{selectedChatData.propertyPrice}</p>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'glass-card'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">Sélectionnez une conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Choisissez une conversation pour commencer à échanger
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;