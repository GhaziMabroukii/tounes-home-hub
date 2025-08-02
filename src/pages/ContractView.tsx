import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Download,
  Edit,
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Home,
  PenTool,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContractView = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<any>(null);
  const [signature, setSignature] = useState("");
  const [userType, setUserType] = useState("");
  const [showSignature, setShowSignature] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const type = localStorage.getItem("userType") || "";
    setUserType(type);

    // Mock contract data - in real app would fetch from API
    const mockContract = {
      id: parseInt(id || "1"),
      propertyTitle: "Studio moderne près INSAT",
      propertyLocation: "Ariana, Raoued",
      propertyAddress: "Rue Ibn Khaldoun, Raoued 2088",
      propertyDetails: {
        surface: "35m²",
        rooms: "1 pièce",
        bathrooms: "1 salle de bain",
        amenities: ["Wi-Fi gratuit", "Meublé", "Parking"]
      },
      landlord: type === "owner" ? "Vous" : "Ahmed Karim",
      landlordPhone: "+216 98 765 432",
      landlordEmail: "ahmed.karim@email.com",
      tenant: type === "owner" ? "Amira Ben Said" : "Vous",
      tenantPhone: "+216 55 123 456",
      tenantEmail: "amira.bensaid@email.com",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      monthlyRent: 450,
      deposit: 450,
      status: "En attente de signature",
      signedDate: null,
      createdDate: "2024-01-15",
      specialTerms: "Paiement le 1er de chaque mois. Pas d'animaux domestiques.",
      ownerSignature: type === "owner" ? "Ahmed Karim - Signé le 15/01/2024" : null,
      tenantSignature: null
    };

    setContract(mockContract);
  }, [id, navigate]);

  const handleSignature = () => {
    if (!signature.trim()) {
      toast({
        title: "Signature requise",
        description: "Veuillez saisir votre nom complet pour signer",
        variant: "destructive"
      });
      return;
    }

    const updatedContract = {
      ...contract,
      status: "Actif",
      signedDate: new Date().toISOString().split('T')[0],
      [userType === "owner" ? "ownerSignature" : "tenantSignature"]: 
        `${signature} - Signé le ${new Date().toLocaleDateString('fr-FR')}`
    };

    setContract(updatedContract);
    setShowSignature(false);
    setSignature("");

    // Update contracts in localStorage
    const existingContracts = JSON.parse(localStorage.getItem("userContracts") || "[]");
    const updatedContracts = existingContracts.map((c: any) => 
      c.id === contract.id ? updatedContract : c
    );
    localStorage.setItem("userContracts", JSON.stringify(updatedContracts));

    toast({
      title: "Contrat signé",
      description: "Votre signature a été enregistrée avec succès",
    });
  };

  const downloadContractPDF = () => {
    // Generate PDF content
    const pdfContent = `
CONTRAT DE LOCATION

=== INFORMATIONS DU BIEN ===
Propriété: ${contract.propertyTitle}
Adresse: ${contract.propertyAddress}
Surface: ${contract.propertyDetails.surface}
Type: ${contract.propertyDetails.rooms}

=== PARTIES CONTRACTANTES ===
Propriétaire: ${contract.landlord}
Email: ${contract.landlordEmail}
Téléphone: ${contract.landlordPhone}

Locataire: ${contract.tenant}
Email: ${contract.tenantEmail}
Téléphone: ${contract.tenantPhone}

=== TERMES FINANCIERS ===
Loyer mensuel: ${contract.monthlyRent} TND
Caution: ${contract.deposit} TND
Période: Du ${new Date(contract.startDate).toLocaleDateString('fr-FR')} au ${new Date(contract.endDate).toLocaleDateString('fr-FR')}

=== CONDITIONS PARTICULIÈRES ===
${contract.specialTerms}

=== SIGNATURES ===
Propriétaire: ${contract.ownerSignature || "Non signé"}
Locataire: ${contract.tenantSignature || "Non signé"}

Document généré le ${new Date().toLocaleDateString('fr-FR')}
    `;

    // Create and download PDF
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrat-${contract.propertyTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement",
      description: "Le contrat a été téléchargé",
    });
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Chargement du contrat...</p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold gradient-text flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <span>Contrat de location</span>
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant={contract.status === "Actif" ? "default" : "secondary"}>
                {contract.status}
              </Badge>
              <span className="text-muted-foreground">
                Créé le {new Date(contract.createdDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={downloadContractPDF}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
            {contract.status === "En attente de signature" && (
              <Button onClick={() => setShowSignature(true)}>
                <PenTool className="h-4 w-4 mr-2" />
                Signer le contrat
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contract Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Informations du bien</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{contract.propertyTitle}</h3>
                  <p className="text-muted-foreground">{contract.propertyAddress}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface</p>
                    <p className="font-medium">{contract.propertyDetails.surface}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{contract.propertyDetails.rooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Salles de bain</p>
                    <p className="font-medium">{contract.propertyDetails.bathrooms}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Équipements</p>
                  <div className="flex flex-wrap gap-2">
                    {contract.propertyDetails.amenities.map((amenity: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Terms */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Termes du contrat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date de début</p>
                    <p className="font-medium flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(contract.startDate).toLocaleDateString('fr-FR')}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date de fin</p>
                    <p className="font-medium flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(contract.endDate).toLocaleDateString('fr-FR')}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loyer mensuel</p>
                    <p className="font-medium flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{contract.monthlyRent} TND</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Caution</p>
                    <p className="font-medium flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{contract.deposit} TND</span>
                    </p>
                  </div>
                </div>

                {contract.specialTerms && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Conditions particulières</p>
                    <div className="p-3 glass-card rounded-lg">
                      <p className="text-sm">{contract.specialTerms}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Signature Section */}
            {showSignature && (
              <Card className="glass-card border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PenTool className="h-5 w-5" />
                    <span>Signature numérique</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Veuillez saisir votre nom complet pour confirmer votre signature
                    </p>
                    <Textarea
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Votre nom complet"
                      rows={2}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSignature}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirmer la signature
                    </Button>
                    <Button variant="outline" onClick={() => setShowSignature(false)}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parties */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Parties contractantes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Propriétaire</p>
                  <p className="font-medium">{contract.landlord}</p>
                  <p className="text-xs text-muted-foreground">{contract.landlordEmail}</p>
                  <p className="text-xs text-muted-foreground">{contract.landlordPhone}</p>
                  {contract.ownerSignature && (
                    <div className="mt-2 p-2 glass-card rounded text-xs">
                      <CheckCircle className="h-3 w-3 inline mr-1 text-success" />
                      {contract.ownerSignature}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Locataire</p>
                  <p className="font-medium">{contract.tenant}</p>
                  <p className="text-xs text-muted-foreground">{contract.tenantEmail}</p>
                  <p className="text-xs text-muted-foreground">{contract.tenantPhone}</p>
                  {contract.tenantSignature && (
                    <div className="mt-2 p-2 glass-card rounded text-xs">
                      <CheckCircle className="h-3 w-3 inline mr-1 text-success" />
                      {contract.tenantSignature}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Statut du contrat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <Badge 
                    variant={contract.status === "Actif" ? "default" : "secondary"} 
                    className="text-sm"
                  >
                    {contract.status}
                  </Badge>
                  {contract.signedDate && (
                    <p className="text-xs text-muted-foreground">
                      Signé le {new Date(contract.signedDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                  {contract.status === "En attente de signature" && (
                    <p className="text-xs text-muted-foreground">
                      En attente de signature du {userType === "owner" ? "locataire" : "propriétaire"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractView;