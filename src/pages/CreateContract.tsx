import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateContract = () => {
  const [contractData, setContractData] = useState({
    propertyId: "",
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    deposit: "",
    specialTerms: ""
  });
  
  const [userProperties, setUserProperties] = useState<any[]>([]);
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
        description: "Seuls les propriétaires peuvent créer des contrats",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    // Load user properties
    const savedProperties = localStorage.getItem("userProperties");
    if (savedProperties) {
      setUserProperties(JSON.parse(savedProperties));
    }
  }, [navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setContractData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateContract = () => {
    if (!contractData.propertyId || !contractData.tenantName || !contractData.tenantEmail || 
        !contractData.startDate || !contractData.endDate || !contractData.monthlyRent) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Generate mock contract
    const newContract = {
      id: Date.now(),
      propertyTitle: userProperties.find(p => p.id.toString() === contractData.propertyId)?.title || "Propriété",
      propertyLocation: userProperties.find(p => p.id.toString() === contractData.propertyId)?.location || "Location",
      tenant: contractData.tenantName,
      tenantPhone: contractData.tenantPhone,
      tenantEmail: contractData.tenantEmail,
      startDate: contractData.startDate,
      endDate: contractData.endDate,
      monthlyRent: parseInt(contractData.monthlyRent),
      deposit: parseInt(contractData.deposit || contractData.monthlyRent),
      status: "En attente de signature",
      signedDate: null,
      contractUrl: `/contracts/contract-${Date.now()}.pdf`,
      paymentStatus: "En attente",
      nextPaymentDue: contractData.startDate,
      totalRevenue: 0,
      specialTerms: contractData.specialTerms
    };

    // Save to localStorage
    const existingContracts = JSON.parse(localStorage.getItem("userContracts") || "[]");
    existingContracts.push(newContract);
    localStorage.setItem("userContracts", JSON.stringify(existingContracts));

    toast({
      title: "Contrat créé",
      description: "Le contrat a été généré et envoyé au locataire pour signature numérique",
    });

    navigate("/contracts");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/contracts")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <span>Créer un nouveau contrat</span>
            </h1>
            <p className="text-muted-foreground">
              Générez un contrat numérique sécurisé pour votre locataire
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contract Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Informations du contrat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Selection */}
              <div>
                <Label htmlFor="property">Propriété *</Label>
                <Select value={contractData.propertyId} onValueChange={(value) => handleInputChange("propertyId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    {userProperties.map((property) => (
                      <SelectItem key={property.id} value={property.id.toString()}>
                        {property.title} - {property.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenant Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tenantName">Nom du locataire *</Label>
                  <Input
                    id="tenantName"
                    value={contractData.tenantName}
                    onChange={(e) => handleInputChange("tenantName", e.target.value)}
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="tenantEmail">Email *</Label>
                  <Input
                    id="tenantEmail"
                    type="email"
                    value={contractData.tenantEmail}
                    onChange={(e) => handleInputChange("tenantEmail", e.target.value)}
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tenantPhone">Téléphone</Label>
                <Input
                  id="tenantPhone"
                  value={contractData.tenantPhone}
                  onChange={(e) => handleInputChange("tenantPhone", e.target.value)}
                  placeholder="+216 XX XXX XXX"
                />
              </div>

              {/* Contract Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Date de début *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={contractData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Date de fin *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={contractData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyRent">Loyer mensuel (TND) *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={contractData.monthlyRent}
                    onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                    placeholder="450"
                  />
                </div>
                <div>
                  <Label htmlFor="deposit">Caution (TND)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={contractData.deposit}
                    onChange={(e) => handleInputChange("deposit", e.target.value)}
                    placeholder="450"
                  />
                </div>
              </div>

              {/* Special Terms */}
              <div>
                <Label htmlFor="specialTerms">Conditions particulières</Label>
                <Textarea
                  id="specialTerms"
                  value={contractData.specialTerms}
                  onChange={(e) => handleInputChange("specialTerms", e.target.value)}
                  placeholder="Ajoutez des conditions spéciales si nécessaire..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contract Preview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Aperçu du contrat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="text-center font-bold text-lg mb-6">
                  CONTRAT DE LOCATION
                </div>
                
                <div>
                  <strong>Propriété:</strong> {userProperties.find(p => p.id.toString() === contractData.propertyId)?.title || "Non sélectionnée"}
                </div>
                
                <div>
                  <strong>Locataire:</strong> {contractData.tenantName || "Non renseigné"}
                </div>
                
                <div>
                  <strong>Période:</strong> {contractData.startDate ? new Date(contractData.startDate).toLocaleDateString('fr-FR') : "Non renseignée"} 
                  {contractData.endDate ? ` au ${new Date(contractData.endDate).toLocaleDateString('fr-FR')}` : ""}
                </div>
                
                <div>
                  <strong>Loyer mensuel:</strong> {contractData.monthlyRent ? `${contractData.monthlyRent} TND` : "Non renseigné"}
                </div>
                
                <div>
                  <strong>Caution:</strong> {contractData.deposit || contractData.monthlyRent ? `${contractData.deposit || contractData.monthlyRent} TND` : "Non renseignée"}
                </div>

                {contractData.specialTerms && (
                  <div>
                    <strong>Conditions particulières:</strong>
                    <p className="mt-1 text-muted-foreground">{contractData.specialTerms}</p>
                  </div>
                )}

                <div className="mt-8 p-4 glass-card rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Ce contrat sera envoyé par email au locataire pour signature numérique sécurisée.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={() => navigate("/contracts")}>
            Annuler
          </Button>
          <Button onClick={generateContract} className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Générer et envoyer le contrat</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateContract;