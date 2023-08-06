import { createContext, useContext, useState } from "react";

const productContext = createContext();

export const useProducts = () => useContext(productContext);

const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  return (
    <productContext.Provider value={{ productList, setProductList }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
