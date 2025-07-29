import { Button } from "@/components/ui/button";
import { MapPin, Search, Users, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-tunisia.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-background overflow-hidden">
      {/* Background Image with Brutal Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Brutal Color Blocks */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent brutal-border brutal-shadow-lg rotate-12 hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-secondary brutal-border brutal-shadow-sm -rotate-12 hidden lg:block" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-highlight brutal-border brutal-shadow-sm rotate-45 hidden lg:block" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-6 leading-tight">
            TROUVEZ VOTRE
            <span className="block text-primary">CHEZ-VOUS</span>
            <span className="block text-secondary">EN TUNISIE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-bold uppercase tracking-wide mb-8 text-muted-foreground">
            Plateforme de location intelligente pour étudiants et familles
          </p>

          {/* User Type Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="accent" size="lg" className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5" />
              JE SUIS ÉTUDIANT
            </Button>
            <Button variant="highlight" size="lg" className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              JE SUIS UNE FAMILLE
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="brutal-card bg-background">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="OÙ CHERCHEZ-VOUS ?"
                    className="brutal-input w-full"
                  />
                </div>
                <Button variant="default" size="lg" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  CHERCHER
                </Button>
              </div>
              
              {/* Quick Location Button */}
              <div className="mt-4 pt-4 border-t-4 border-border">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  📍 ME LOCALISER
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="brutal-card bg-primary text-primary-foreground">
              <div className="text-2xl font-black">500+</div>
              <div className="text-sm font-bold uppercase">BIENS</div>
            </div>
            <div className="brutal-card bg-secondary text-secondary-foreground">
              <div className="text-2xl font-black">20+</div>
              <div className="text-sm font-bold uppercase">VILLES</div>
            </div>
            <div className="brutal-card bg-accent text-accent-foreground">
              <div className="text-2xl font-black">1000+</div>
              <div className="text-sm font-bold uppercase">ÉTUDIANTS</div>
            </div>
            <div className="brutal-card bg-highlight text-highlight-foreground">
              <div className="text-2xl font-black">24H</div>
              <div className="text-sm font-bold uppercase">SUPPORT</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;