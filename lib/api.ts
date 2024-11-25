// lib/api.ts
import { Pokemon } from "../types/Pokemon";

let cachedCards: Pokemon[] | null = null;

export async function fetchPokemonCards(): Promise<Pokemon[]> {
  if (cachedCards) {
    return cachedCards; // Return cached data if available
  }

  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v1.json"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch cards: ${res.status} ${res.statusText}`);
    }
    const data: Pokemon[] = await res.json();
    cachedCards = data; // Cache the data
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
}
