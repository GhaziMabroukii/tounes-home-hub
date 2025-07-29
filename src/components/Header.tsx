import { Button } from "@/components/ui/button";
import { MapPin, Menu, User } from "lucide-react";

const Header = () => {
  return (
    <header className="brutal-border-thin border-t-0 border-l-0 border-r-0 bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="brutal-border bg-primary text-primary-foreground p-2 brutal-shadow-sm">
              <MapPin className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider">
              EKRILI
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              CHERCHER
            </Button>
            <Button variant="ghost" size="sm">
              LOUER
            </Button>
            <Button variant="outline" size="sm">
              CONNEXION
            </Button>
            <Button variant="secondary" size="sm">
              S'INSCRIRE
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;