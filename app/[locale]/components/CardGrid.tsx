"use client";

import { useCards } from "@/context/CardsContext"; // Fetch cards from context
import Image from "next/image";
import { Card, CardContent } from "@/app/[locale]/components/ui/card";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/[locale]/components/ui/alert";
import CardGridSkeleton from "./CardGridSkeleton";
import { useTranslation } from "react-i18next"; // Import translation hook

export default function CardGrid() {
  const { t } = useTranslation("common"); // Use "common" namespace for translations
  const { cards, loading, error, searchTerm } = useCards(); // Fetch data from context

  if (loading) {
    return <CardGridSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("error_title")}</AlertTitle>
        <AlertDescription>
          {t("error_loading_cards", { error })} {/* Translated error message */}
        </AlertDescription>
      </Alert>
    );
  }

  const filteredCards = cards?.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredCards || filteredCards.length === 0) {
    return (
      <p className="text-center text-gray-500">{t("no_cards_available")}</p>
    );
  }

  // Function to map rarities to their translations dynamically
  const translateRarity = (rarity: string) => {
    const rarityParts = rarity.split(" "); // Split rarity string into parts
    const translatedParts = rarityParts.map(
      (part) => t(`rarities.${part.toLowerCase()}`, part) // Translate each part, fallback to original
    );
    return translatedParts.join(" "); // Reassemble translated parts
  };

  // Function to map types to their corresponding images
  const getTypeImage = (type: string) => {
    switch (type.toLowerCase()) {
      case "grass":
        return "/symbols/grass.png"; // Path relative to public folder
      case "fire":
        return "/symbols/fire.png";
      case "water":
        return "/symbols/water.png";
      case "lightning":
        return "/symbols/electric.png";
      case "psychic":
        return "/symbols/psychic.png";
      case "darkness":
        return "/symbols/dark.png";
      case "fighting":
        return "/symbols/fighting.png";
      case "metal":
        return "/symbols/metal.png";
      case "colorless":
        return "/symbols/normal.png";
      case "dragon":
        return "/symbols/dragon.png";
      default:
        return null; // Return null if no image is available
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredCards.map((card) => (
        <Card key={card.id} className="overflow-hidden">
          <CardContent className="p-4">
            {/* Card Image */}
            <div className="relative w-full h-64">
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            {/* Centered Card Data */}
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold mb-2">{card.name}</h2>
              {/* Type with Symbol */}
              <div className="text-sm text-gray-600 mb-2 flex items-center justify-center">
                <span className="mr-2">{t("type")}:</span> {/* Text label */}
                {getTypeImage(card.type) ? (
                  <Image
                    src={getTypeImage(card.type)!} // Use type image if available
                    alt={`${card.type} type symbol`}
                    width={20}
                    height={20} // Adjust size as needed
                    className="inline-block"
                  />
                ) : (
                  <span>{card.type}</span> // Fallback to text if no image
                )}
              </div>
              {card.hp && (
                <p className="text-sm text-gray-600 mb-2">
                  {t("hp")}: {card.hp}
                </p>
              )}
              {card.rarity && (
                <p className="text-sm text-gray-600">
                  {t("rarity")}: {translateRarity(card.rarity)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
