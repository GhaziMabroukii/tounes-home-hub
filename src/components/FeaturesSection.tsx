import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, Shield, Zap, Users, GraduationCap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "GÉOLOCALISATION PRÉCISE",
      description: "Trouvez des biens dans un rayon de 1-5km de votre position actuelle",
      color: "bg-primary text-primary-foreground"
    },
    {
      icon: MessageSquare,
      title: "CHAT EN TEMPS RÉEL", 
      description: "Contactez directement les propriétaires via notre messagerie intégrée",
      color: "bg-accent text-accent-foreground"
    },
    {
      icon: Shield,
      title: "CONTRATS SÉCURISÉS",
      description: "Signature électronique et paiements via D17 en toute sécurité",
      color: "bg-secondary text-secondary-foreground"
    },
    {
      icon: Zap,
      title: "PRIX FLEXIBLES",
      description: "Tarification jour/semaine/mois/année adaptée à vos besoins",
      color: "bg-highlight text-highlight-foreground"
    },
    {
      icon: GraduationCap,
      title: "SPÉCIAL ÉTUDIANTS",
      description: "Filtres par université, colocation, garantie parentale",
      color: "bg-warning text-warning-foreground"
    },
    {
      icon: Users,
      title: "FAMILY FRIENDLY",
      description: "Biens avec jardins sécurisés, proximité écoles et parcs",
      color: "bg-destructive text-destructive-foreground"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4">
            POURQUOI CHOISIR
            <span className="block text-primary">EKRILI ?</span>
          </h2>
          <p className="text-lg font-bold uppercase tracking-wide text-muted-foreground">
            LA PLATEFORME QUI COMPREND LA TUNISIE
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="brutal-card bg-background hover:scale-105 transition-transform duration-200">
                <div className={`inline-flex p-3 brutal-border brutal-shadow-sm mb-4 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wider mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm font-bold text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="brutal-card bg-background max-w-md mx-auto">
            <h3 className="text-2xl font-black uppercase tracking-wider mb-4">
              PRÊT À COMMENCER ?
            </h3>
            <div className="space-y-3">
              <Button variant="default" size="lg" className="w-full">
                CRÉER MON COMPTE
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                DÉCOUVRIR LES BIENS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;