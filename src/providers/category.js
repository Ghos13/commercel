import { createContext, useState, useEffect } from "react";

const api_url = process.env.REACT_APP_API;

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch(`${api_url}admin_api/category`);

        if (!res.ok) {
          setCategoryLoading(null);
          return;
        }

        const importInfoData = await res.json();
        setCategoryData(importInfoData);
        setCategoryLoading(false);
      } catch (error) {
        setCategoryLoading(null);
        console.error(`Error: ${error}`);
      }
    };

    func();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData, categoryLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};
