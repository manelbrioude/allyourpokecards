import Link from "next/link";
import LanguageChanger from "./LanguageChanger";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation("common"); // Access the "common" namespace

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className="hover:text-purple-300 font-semibold transition-colors"
            >
              {t("all_cards")} {/* Use translation for "All Cards" */}
            </Link>
          </li>
          <li>
            <Link
              href="/collection"
              className="hover:text-purple-300 font-semibold transition-colors"
            >
              {t("my_collection")} {/* Use translation for "My Collection" */}
            </Link>
          </li>
        </ul>
        <LanguageChanger />
      </div>
    </nav>
  );
}
