import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../supabase/SupabaseClient";

// Create a context
const RatingsContext = createContext();

// Create a provider component
export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ratings from Supabase
  const fetchRatings = async (menuId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menus')
        .select('id, rating')
        .eq('id', menuId);

      if (error) {
        throw error;
      }

      setRatings((prevRatings) => ({
        ...prevRatings,
        [menuId]: data.length > 0 ? data[0].rating : [],
      }));
    } catch (error) {
      setError(error);
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update ratings
  const updateRating = async (menuId, newRating) => {
    try {
      setLoading(true);

      // Fetch current ratings first
      const currentRatings = ratings[menuId] || [];

      // Append the new rating
      const updatedRatings = [...currentRatings, newRating];

      // Update the ratings in the database
      const { data, error } = await supabase
        .from('menus')
        .update({ rating: updatedRatings })
        .eq('id', menuId)
        .select('rating');

      if (error) {
        throw error;
      }

      // Update local state with the new ratings
      setRatings((prevRatings) => ({
        ...prevRatings,
        [menuId]: updatedRatings,
      }));
    } catch (error) {
      setError(error);
      console.error("Error updating rating:", error);
    } finally {
      setLoading(false);
    }
  };

  // Expose ratings and the functions to update them
  return (
    <RatingsContext.Provider value={{ ratings, loading, error, fetchRatings, updateRating }}>
      {children}
    </RatingsContext.Provider>
  );
};

// Custom hook to use the RatingsContext
export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};
