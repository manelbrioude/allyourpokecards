import CardGrid from "@/components/CardGrid";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Website Title */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 text-center mb-12">
        Pokémon TCG Pocket
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Cards Grid */}
      <CardGrid />
    </main>
  );
}
