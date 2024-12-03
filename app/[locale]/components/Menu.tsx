"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LanguageChanger from "./LanguageChanger";

export default function Menu() {
  const { t } = useTranslation("common"); // Access the "common" namespace
  const pathname = usePathname(); // Get the current path to extract the locale
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Determine the locale from the URL
  const locale = pathname.startsWith("/es") ? "es" : "en"; // Default to "en" if no "/es" prefix

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Update state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link
              href={locale === "es" ? "/es/" : "/"}
              className="hover:text-purple-300 font-semibold transition-colors"
            >
              {t("all_cards")} {/* Use translation for "All Cards" */}
            </Link>
          </li>
          <li>
            <Link
              href={locale === "es" ? "/es/collection" : "/collection"}
              className="hover:text-purple-300 font-semibold transition-colors"
            >
              {t("my_collection")} {/* Use translation for "My Collection" */}
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <LanguageChanger />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
            >
              {t("logout")} {/* Use translation for "Logout" */}
            </button>
          ) : (
            pathname !== (locale === "es" ? "/es/login" : "/login") && ( // Hide Login button if already on login page
              <Link
                href={locale === "es" ? "/es/login" : "/login"}
                className="relative inline-block px-6 py-2 font-semibold text-sm text-white bg-blue-500 rounded-lg shadow-md transition-all hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {t("login")} {/* Use translation for "Login" */}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
