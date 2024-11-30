"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import initTranslations from "@/app/i18n";

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    const initializeI18n = async () => {
      const instance = createInstance();
      const { i18n } = await initTranslations(
        locale,
        namespaces,
        instance,
        resources
      );
      setI18nInstance(i18n);
    };

    initializeI18n();
  }, [locale, namespaces, resources]);

  // Show a fallback while i18n is initializing
  if (!i18nInstance) {
    return <div>Loading translations...</div>;
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
