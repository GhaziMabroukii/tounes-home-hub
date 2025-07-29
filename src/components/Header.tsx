import { Button } from "@/components/ui/button";
import { MapPin, Menu, Bell, Heart, User, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="gradient-button p-2 rounded-xl">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Ekrili
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Location intelligente
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Découvrir
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Pour étudiants
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Pour familles
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Louer mon bien
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs"></span>
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Search on mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
              <Button variant="default" size="sm">
                S'inscrire
              </Button>
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;