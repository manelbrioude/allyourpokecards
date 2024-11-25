"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchPokemonCards } from "@/lib/api";
import { Pokemon } from "../types/Pokemon";

interface CardsContextValue {
  cards: Pokemon[] | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CardsContext = createContext<CardsContextValue | undefined>(undefined);

export const CardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemonCards()
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      });
  }, []);

  return (
    <CardsContext.Provider
      value={{ cards, loading, error, searchTerm, setSearchTerm }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
