import { createContext, useState, useEffect } from "react";

const api_url = process.env.REACT_APP_API;

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brandData, setBrandData] = useState([]);
  const [brandLoading, setBrandLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch(`${api_url}admin_api/brands`);

        if (!res.ok) {
          setBrandLoading(null);
          return;
        }

        const importInfoData = await res.json();
        setBrandData(importInfoData);
        setBrandLoading(false);
      } catch (error) {
        setBrandLoading(null);
        console.error(`Error: ${error}`);
      }
    };

    func();
  }, []);

  return (
    <BrandContext.Provider value={{ brandData, brandLoading }}>
      {children}
    </BrandContext.Provider>
  );
};
