import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Heart, 
  Share, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Home,
  Users,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  GraduationCap,
  Shield,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock property data
  const property = {
    id: 1,
    title: "Studio moderne près INSAT",
    price: 450,
    priceType: "mois",
    location: "Ariana, Raoued",
    address: "Rue Ibn Khaldoun, Raoued 2088",
    distance: "200m de l'INSAT",
    rating: 4.8,
    reviews: 24,
    type: "studio",
    surface: 35,
    rooms: 1,
    amenities: ["wifi", "furnished", "parking", "AC", "washing_machine"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    isStudentFriendly: true,
    description: "Studio moderne parfaitement situé à proximité de l'INSAT. Idéal pour étudiant, entièrement meublé avec tous les équipements nécessaires. Quartier calme et sécurisé avec commerces à proximité.",
    rules: [
      "Non-fumeur uniquement",
      "Pas d'animaux",
      "Caution: 1 mois de loyer",
      "Préavis: 1 mois"
    ],
    owner: {
      name: "Ahmed Karim",
      avatar: "AK",
      rating: 4.9,
      properties: 5,
      joinedDate: "2020",
      verified: true,
      phone: "+216 98 765 432",
      email: "ahmed.karim@email.com",
      responseTime: "Répond en 1h",
      languages: ["Français", "Arabe", "Anglais"]
    },
    availability: {
      available: true,
      availableFrom: "Immédiatement",
      minimumStay: "3 mois",
      maximumStay: "12 mois"
    },
    pricing: {
      monthly: 450,
      deposit: 450,
      fees: 50,
      utilities: "Électricité incluse jusqu'à 100 TND/mois"
    },
    location_details: {
      nearby: [
        { name: "INSAT", distance: "200m", type: "université" },
        { name: "Carrefour Market", distance: "300m", type: "commerce" },
        { name: "Café Central", distance: "150m", type: "café" },
        { name: "Pharmacie", distance: "250m", type: "santé" }
      ]
    }
  };

  const amenityLabels: { [key: string]: { label: string; icon: JSX.Element } } = {
    wifi: { label: "Wi-Fi gratuit", icon: <Wifi className="h-4 w-4" /> },
    furnished: { label: "Meublé", icon: <Home className="h-4 w-4" /> },
    parking: { label: "Parking", icon: <Car className="h-4 w-4" /> },
    AC: { label: "Climatisation", icon: <span>❄️</span> },
    washing_machine: { label: "Lave-linge", icon: <span>🫧</span> }
  };

  const handleContact = () => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour contacter le propriétaire.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(`/messages?contact=${property.owner.name}`);
  };

  const handleFavorite = () => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour ajouter aux favoris.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isFavorite ? "Bien retiré de vos favoris" : "Bien ajouté à vos favoris",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <Card className="glass-card mb-6">
              <CardContent className="p-0">
                <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Button variant="secondary" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Voir toutes les photos
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    {property.isStudentFriendly && (
                      <Badge className="mb-2">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Étudiant
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl gradient-text">{property.title}</CardTitle>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-accent text-sm">📍 {property.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleFavorite}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews} avis)</span>
                  </div>
                  <Badge variant="outline">{property.surface}m²</Badge>
                  <Badge variant="outline">{property.rooms} pièce</Badge>
                </div>

                <p className="text-muted-foreground mb-6">{property.description}</p>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Équipements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        {amenityLabels[amenity]?.icon}
                        <span className="text-sm">{amenityLabels[amenity]?.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Nearby */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle>Localisation et environs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Carte interactive</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {property.location_details.nearby.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{place.name}</p>
                        <p className="text-xs text-muted-foreground">{place.type}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{place.distance}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Règles du logement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {property.pricing.monthly} TND/mois
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loyer mensuel</span>
                    <span>{property.pricing.monthly} TND</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Caution</span>
                    <span>{property.pricing.deposit} TND</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frais de dossier</span>
                    <span>{property.pricing.fees} TND</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total premier mois</span>
                    <span>{property.pricing.monthly + property.pricing.deposit + property.pricing.fees} TND</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">{property.pricing.utilities}</p>

                <div className="space-y-2">
                  <Button onClick={handleContact} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contacter le propriétaire
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier une visite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Disponibilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Disponible</span>
                  <span className="text-sm font-medium">{property.availability.availableFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Séjour minimum</span>
                  <span className="text-sm font-medium">{property.availability.minimumStay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Séjour maximum</span>
                  <span className="text-sm font-medium">{property.availability.maximumStay}</span>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Propriétaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback>{property.owner.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{property.owner.name}</h3>
                      {property.owner.verified && (
                        <Shield className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-sm">{property.owner.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biens</span>
                    <span>{property.owner.properties}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membre depuis</span>
                    <span>{property.owner.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temps de réponse</span>
                    <span className="text-success">{property.owner.responseTime}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Langues parlées:</p>
                  <div className="flex flex-wrap gap-1">
                    {property.owner.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Appeler
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;