"use client";

import { useState, useEffect } from "react";
import { useCards } from "@/context/CardsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function SearchBar() {
  const { setSearchTerm } = useCards();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm("");
    setSearchTerm(""); // Clear the global search term as well
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-center items-center mb-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        {/* Input Container */}
        <div className="relative flex-grow w-full sm:w-2/3 md:w-1/2 lg:w-1/3 min-w-[300px]">
          <Input
            type="text"
            placeholder="Search cards by name..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="w-full pr-10"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Clear search"
            >
              ❌
            </button>
          )}
        </div>
        {/* Search Button */}
        <Button type="submit" className="w-auto">
          Search
        </Button>
      </div>
    </form>
  );
}
