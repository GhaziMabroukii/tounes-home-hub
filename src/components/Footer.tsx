import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="brutal-border bg-primary text-primary-foreground p-2 brutal-shadow-sm">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-wider">
                EKRILI
              </h3>
            </div>
            <p className="font-bold text-sm mb-4">
              LA PLATEFORME DE LOCATION INTELLIGENTE POUR LA TUNISIE
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="bg-background text-foreground">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-background text-foreground">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* For Tenants */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-wider mb-4">
              LOCATAIRES
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">CHERCHER UN BIEN</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ESPACE ÉTUDIANT</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ESPACE FAMILLE</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MES FAVORIS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">CONTRATS</a></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-wider mb-4">
              PROPRIÉTAIRES
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">POSTER UNE ANNONCE</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">TABLEAU DE BORD</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GESTION CONTRATS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">PAIEMENTS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">STATISTIQUES</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-wider mb-4">
              CONTACT
            </h4>
            <div className="space-y-3 text-sm font-bold">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>CONTACT@EKRILI.TN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>TUNIS, TUNISIE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-background mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-bold">
              © 2024 EKRILI. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm font-bold">
              <a href="#" className="hover:text-primary transition-colors">CONDITIONS</a>
              <a href="#" className="hover:text-primary transition-colors">CONFIDENTIALITÉ</a>
              <a href="#" className="hover:text-primary transition-colors">AIDE</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;