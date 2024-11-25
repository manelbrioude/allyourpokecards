"use client";

import { useCards } from "@/context/CardsContext";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CardGridSkeleton from "./CardGridSkeleton";

export default function CardGrid() {
  const { cards, loading, error, searchTerm } = useCards();

  if (loading) {
    return <CardGridSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load Pokemon cards: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const filteredCards = cards?.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredCards?.map((card) => (
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
              <p className="text-sm text-gray-600 mb-2">Type: {card.type}</p>
              {card.hp && (
                <p className="text-sm text-gray-600 mb-2">HP: {card.hp}</p>
              )}
              {card.rarity && (
                <p className="text-sm text-gray-600">Rarity: {card.rarity}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
