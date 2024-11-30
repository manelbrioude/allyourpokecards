import TranslationsProvider from "./components/TranslationProvider";
import CardGrid from "@/app/[locale]/components/CardGrid";
import SearchBar from "@/app/[locale]/components/SearchBar";
import initTranslations from "@/app/i18n";

interface Params {
  locale: string;
}

export default async function Home({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}) {
  const params = await paramsPromise;
  const { locale } = params;

  // Fetch resources for the current locale and namespaces
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={["common"]}
      resources={resources}
    >
      <main className="container mx-auto px-4 py-16">
        <h1
          className="text-5xl sm:text-7xl font-extrabold text-transparent 
                     bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 
                     text-center mb-12 leading-[1.2] sm:leading-[1.3] pb-2"
        >
          Pokemon TCG Pocket
        </h1>
        <div className="mb-8">
          <SearchBar />
        </div>
        <CardGrid /> {/* No props needed */}
      </main>
    </TranslationsProvider>
  );
}
