import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [wishes, setWishes] = useState([]);

  return (
    <ProductsContext.Provider value={{ wishes, setWishes }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useWishes = () => useContext(ProductsContext);
