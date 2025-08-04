import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  Upload, 
  Plus, 
  X,
  Wifi,
  Car,
  Bed,
  Bath,
  Square
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    priceType: "mois",
    surface: "",
    rooms: "",
    bathrooms: "",
    address: "",
    location: { lat: 0, lng: 0 },
    amenities: [] as string[],
    rules: [] as string[],
    images: [] as File[],
    availability: {
      available: true,
      availableFrom: "",
      minimumStay: "",
      maximumStay: ""
    },
        pricing: {
          deposit: "",
          fees: "",
          utilities: "",
          utilitiesIncluded: false
        }
  });

  const [newRule, setNewRule] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated and is an owner
    const isAuth = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType");
    
    if (!isAuth) {
      navigate("/login");
      return;
    }
    
    if (userType !== "owner") {
      toast({
        title: "Accès refusé",
        description: "Seuls les propriétaires peuvent ajouter des biens",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
  }, [navigate, toast]);

  const availableAmenities = [
    { id: "wifi", label: "Wi-Fi gratuit", icon: <Wifi className="h-4 w-4" /> },
    { id: "furnished", label: "Meublé", icon: <Home className="h-4 w-4" /> },
    { id: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
    { id: "AC", label: "Climatisation", icon: <span>❄️</span> },
    { id: "washing_machine", label: "Lave-linge", icon: <span>🫧</span> },
    { id: "garden", label: "Jardin", icon: <span>🌿</span> },
    { id: "security", label: "Sécurité", icon: <span>🔒</span> },
    { id: "elevator", label: "Ascenseur", icon: <span>🛗</span> },
    { id: "balcony", label: "Balcon", icon: <span>🏠</span> },
    { id: "kitchen", label: "Cuisine équipée", icon: <span>🍳</span> }
  ];

  const propertyTypes = [
    { value: "studio", label: "Studio" },
    { value: "apartment", label: "Appartement" },
    { value: "villa", label: "Villa" },
    { value: "house", label: "Maison" },
    { value: "vacation", label: "Maison de vacances" },
    { value: "room", label: "Chambre" },
    { value: "office", label: "Bureau" },
    { value: "shop", label: "Local commercial" }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()]
      }));
      setNewRule("");
    }
  };

  const removeRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10) // Max 10 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleLocationClick = () => {
    // Mock location picker - in real app would open map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleInputChange('location', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Localisation mise à jour",
            description: "Position actuelle utilisée",
          });
        },
        () => {
          toast({
            title: "Erreur de géolocalisation",
            description: "Impossible d'obtenir votre position",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.type || !formData.price || !formData.address) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Mock save - in real app would call API
    const newProperty = {
      ...formData,
      id: Date.now(),
      owner: JSON.parse(localStorage.getItem("userProfile") || "{}"),
      createdAt: new Date().toISOString(),
      status: "En attente de validation"
    };

    // Save to mock storage
    const existingProperties = JSON.parse(localStorage.getItem("userProperties") || "[]");
    localStorage.setItem("userProperties", JSON.stringify([...existingProperties, newProperty]));

    toast({
      title: "Bien ajouté avec succès!",
      description: "Votre bien est en cours de validation",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text flex items-center space-x-3">
            <Plus className="h-8 w-8 text-primary" />
            <span>Ajouter un bien</span>
          </h1>
          <p className="text-muted-foreground">
            Publiez votre propriété et trouvez des locataires
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre de l'annonce *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Studio moderne près INSAT"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type de bien *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="surface">Surface (m²) *</Label>
                    <Input
                      id="surface"
                      type="number"
                      value={formData.surface}
                      onChange={(e) => handleInputChange('surface', e.target.value)}
                      placeholder="35"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rooms">Nombre de pièces</Label>
                    <Input
                      id="rooms"
                      type="number"
                      value={formData.rooms}
                      onChange={(e) => handleInputChange('rooms', e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Salles de bain</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Décrivez votre bien..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Rue Ibn Khaldoun, Raoued 2088"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleLocationClick}
                    className="w-full"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Définir la position exacte
                  </Button>
                  
                  {formData.location.lat !== 0 && (
                    <p className="text-sm text-success">
                      ✓ Position définie: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                    </p>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Note: La position sur carte est prioritaire si elle est définie. Sinon, l'adresse manuelle est utilisée.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={formData.amenities.includes(amenity.id)}
                        onCheckedChange={() => toggleAmenity(amenity.id)}
                      />
                      <Label htmlFor={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                        {amenity.icon}
                        <span className="text-sm">{amenity.label}</span>
                      </Label>
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
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    placeholder="Ajouter une règle..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRule())}
                  />
                  <Button type="button" onClick={addRule}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.rules.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-2 glass-card rounded">
                      <span className="text-sm">{rule}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeRule(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">Ajouter des photos</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Tarification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="price">Prix *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="450"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceType">Période</Label>
                    <Select value={formData.priceType} onValueChange={(value) => handleInputChange('priceType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jour">Jour</SelectItem>
                        <SelectItem value="semaine">Semaine</SelectItem>
                        <SelectItem value="mois">Mois</SelectItem>
                        <SelectItem value="année">Année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="deposit">Caution (TND)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={formData.pricing.deposit}
                    onChange={(e) => handleInputChange('pricing.deposit', e.target.value)}
                    placeholder="450"
                  />
                </div>

                <div>
                  <Label htmlFor="fees">Frais de dossier (TND)</Label>
                  <Input
                    id="fees"
                    type="number"
                    value={formData.pricing.fees}
                    onChange={(e) => handleInputChange('pricing.fees', e.target.value)}
                    placeholder="50"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="utilitiesIncluded"
                    checked={formData.pricing.utilitiesIncluded}
                    onCheckedChange={(checked) => handleInputChange('pricing.utilitiesIncluded', checked)}
                  />
                  <Label htmlFor="utilitiesIncluded">Charges incluses</Label>
                </div>

                <div>
                  <Label htmlFor="fees">Frais de dossier (TND)</Label>
                  <Input
                    id="fees"
                    type="number"
                    value={formData.pricing.fees}
                    onChange={(e) => handleInputChange('pricing.fees', e.target.value)}
                    placeholder="50"
                  />
                </div>

                <div>
                  <Label htmlFor="utilities">Charges incluses</Label>
                  <Input
                    id="utilities"
                    value={formData.pricing.utilities}
                    onChange={(e) => handleInputChange('pricing.utilities', e.target.value)}
                    placeholder="Électricité incluse jusqu'à 100 TND/mois"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Disponibilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="availableFrom">Disponible à partir du</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availability.availableFrom}
                    onChange={(e) => handleInputChange('availability.availableFrom', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="minimumStay">Séjour minimum</Label>
                  <Select value={formData.availability.minimumStay} onValueChange={(value) => handleInputChange('availability.minimumStay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 semaine">1 semaine</SelectItem>
                      <SelectItem value="1 mois">1 mois</SelectItem>
                      <SelectItem value="3 mois">3 mois</SelectItem>
                      <SelectItem value="6 mois">6 mois</SelectItem>
                      <SelectItem value="1 an">1 an</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maximumStay">Séjour maximum</Label>
                  <Select value={formData.availability.maximumStay} onValueChange={(value) => handleInputChange('availability.maximumStay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 mois">3 mois</SelectItem>
                      <SelectItem value="6 mois">6 mois</SelectItem>
                      <SelectItem value="1 an">1 an</SelectItem>
                      <SelectItem value="2 ans">2 ans</SelectItem>
                      <SelectItem value="Illimité">Illimité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Publier le bien
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Votre bien sera vérifié avant publication
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;