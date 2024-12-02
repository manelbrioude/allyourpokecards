"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    let updatedPath;

    if (/^\/(en|es)/.test(currentPathname)) {
      updatedPath = currentPathname.replace(/^\/(en|es)/, `/${newLocale}`);
    } else {
      updatedPath = `/${newLocale}${currentPathname}`;
    }
    router.push(updatedPath);
  };

  return (
    <div className="flex space-x-4 items-center">
      <button
        onClick={() => changeLanguage("en")}
        className="focus:outline-none"
      >
        <Image
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          width={40}
          height={40}
          className="rounded-full border border-gray-300 hover:border-purple-500 transition-all"
        />
      </button>
      <button
        onClick={() => changeLanguage("es")}
        className="focus:outline-none"
      >
        <Image
          src="https://flagcdn.com/w40/es.png"
          alt="Spanish"
          width={40}
          height={40}
          className="rounded-full border border-gray-300 hover:border-purple-500 transition-all"
        />
      </button>
    </div>
  );
}
