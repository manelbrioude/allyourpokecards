"use client";

import { useCards } from "@/context/CardsContext"; // Fetch all cards
import { useCollection } from "@/context/CollectionContext"; // Manage the collection
import Image from "next/image";
import { useState } from "react"; // State for search input

export default function Collection() {
  const { cards, loading, error } = useCards(); // Get cards data
  const { addCard, removeCard, collection } = useCollection(); // Manage user's collection
  const [searchTerm, setSearchTerm] = useState(""); // State for live filtering

  if (loading) {
    return <p className="text-center">Loading cards...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load cards: {error}</p>
    );
  }

  if (!cards || cards.length === 0) {
    return <p className="text-center text-gray-500">No cards available.</p>;
  }

  // Filter cards based on search term
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total cards in the collection (including duplicates)
  const totalCardsCount = Object.values(collection).reduce(
    (sum, count) => sum + count,
    0
  );

  // Pack names
  const packs = ["Mewtwo", "Pikachu", "Charizard"];

  // Calculate stats for each pack
  const packStats = packs.map((pack) => {
    const packCards = cards.filter((card) => card.pack === pack); // All cards in the pack
    const totalCards = packCards.length; // Total unique cards in the pack

    // Count unique collected cards for the pack
    const collectedCards = packCards.filter(
      (card) => collection[card.id]
    ).length;

    const missingCards = totalCards - collectedCards; // Missing unique cards

    return { pack, totalCards, collectedCards, missingCards };
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 text-center mb-4">
        Your Collection
      </h1>

      {/* Total Cards Count */}
      <p className="text-center text-lg font-semibold mb-8">
        Total Cards in Collection (including duplicates): {totalCardsCount}
      </p>

      {/* Pack Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {packStats.map(({ pack, totalCards, collectedCards, missingCards }) => (
          <div
            key={pack}
            className="border p-4 rounded-md shadow-md flex flex-col items-center text-center bg-gray-100"
          >
            <h2 className="text-xl font-bold">{pack}</h2>
            <p className="text-gray-700">Total Cards: {totalCards}</p>
            <p className="text-gray-700">Collected Cards: {collectedCards}</p>
            <p className="text-gray-700">Missing Cards: {missingCards}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const inCollection = collection[card.id] || 0; // Check if card is in collection

          return (
            <div
              key={card.id}
              className={`border p-4 rounded-md shadow-md flex flex-col items-center text-center ${
                inCollection === 0 ? "opacity-50 grayscale" : ""
              }`}
            >
              {/* Card Image */}
              <div className="relative w-full h-64">
                <Image
                  src={card.image}
                  alt={card.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>

              {/* Card Name */}
              <h2 className="text-lg font-bold mt-4">{card.name}</h2>

              {/* Collection Count */}
              <p className="text-sm text-gray-600 mt-2">
                In Collection: {inCollection}
              </p>

              {/* Pack Name */}
              <p className="text-sm text-gray-500 mt-1">Pack: {card.pack}</p>

              {/* Add and Remove Buttons */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => addCard(card.id)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeCard(card.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
