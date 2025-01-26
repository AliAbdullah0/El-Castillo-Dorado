// src/context/MenusContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/SupabaseClient";

// Create the context
const MenusContext = createContext();

// Create a provider component
export const MenusProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data, error } = await supabase.from("menus").select("*");

        if (error) {
          setError(error.message);
        } else {
          setMenus(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return (
    <MenusContext.Provider value={{ menus, loading, error }}>
      {children}
    </MenusContext.Provider>
  );
};

// Custom hook to use the MenusContext
export const useMenus = () => {
  return useContext(MenusContext);
};
