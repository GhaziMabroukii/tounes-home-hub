import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface PropertyReviewsProps {
  propertyId: number;
}

const PropertyReviews = ({ propertyId }: PropertyReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Amira Ben Ali",
      rating: 5,
      comment: "Excellent logement, très bien situé et propriétaire très réactif. Je recommande vivement !",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      author: "Mohamed Gharbi",
      rating: 4,
      comment: "Bon rapport qualité-prix, proche des universités. Quelques petits détails à améliorer mais globalement satisfait.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 3,
      author: "Sarah Tlili",
      rating: 5,
      comment: "Parfait pour étudiants ! Meublé avec goût, internet rapide et quartier calme.",
      date: "2024-01-05",
      verified: false
    }
  ]);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { toast } = useToast();

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleSubmitReview = () => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour laisser un avis",
        variant: "destructive"
      });
      return;
    }

    if (!newReview.trim() || newRating === 0) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez donner une note et écrire un commentaire",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now(),
      author: localStorage.getItem("userEmail") || "Utilisateur",
      rating: newRating,
      comment: newReview,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    setReviews(prev => [review, ...prev]);
    setNewReview("");
    setNewRating(0);

    toast({
      title: "Avis ajouté",
      description: "Votre avis a été publié avec succès"
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:fill-yellow-400 hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avis et commentaires</span>
          <div className="flex items-center space-x-2">
            {renderStars(Math.round(averageRating))}
            <span className="text-sm text-muted-foreground">
              ({reviews.length} avis)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Review */}
        <div className="glass-card p-4 space-y-4">
          <h4 className="font-medium">Laisser un avis</h4>
          <div>
            <label className="text-sm font-medium mb-2 block">Votre note</label>
            {renderStars(newRating, true, setNewRating)}
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Votre commentaire</label>
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Partagez votre expérience avec ce logement..."
              rows={3}
            />
          </div>
          <Button onClick={handleSubmitReview} className="w-full">
            Publier l'avis
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border/50 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{review.author}</span>
                    {review.verified && (
                      <span className="bg-success/20 text-success text-xs px-2 py-1 rounded-full">
                        Vérifié
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun avis pour le moment</p>
            <p className="text-sm text-muted-foreground">Soyez le premier à laisser un avis !</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyReviews;