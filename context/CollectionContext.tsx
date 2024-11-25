import { createContext, useContext, useState } from "react";

interface CollectionContextValue {
  collection: Record<string, number>;
  addCard: (id: string) => void;
  removeCard: (id: string) => void;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(
  undefined
);

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collection, setCollection] = useState<Record<string, number>>({});

  const addCard = (id: string) => {
    setCollection((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeCard = (id: string) => {
    setCollection((prev) => {
      const newCollection = { ...prev };
      if (newCollection[id] > 1) {
        newCollection[id] -= 1;
      } else {
        delete newCollection[id];
      }
      return newCollection;
    });
  };

  return (
    <CollectionContext.Provider value={{ collection, addCard, removeCard }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
};
