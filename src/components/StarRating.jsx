import React, { useState } from "react";
import { supabase } from "../../supabase/SupabaseClient"; // Make sure you import supabase

const StarRating = ({ rating, onRatingChange, itemId }) => {
  // Handles the click event on a star and updates the rating
  const handleClick = (newRating) => {
    onRatingChange(itemId, newRating); // Calls the passed onRatingChange function
  };

  // Updates the rating in the database
  const handleRatingChange = async (itemId, newRating) => {
    const { error } = await supabase
      .from("ratings")
      .upsert([{ menu_item_id: itemId, rating: newRating }]); // Update the rating in the 'ratings' table

    if (error) {
      console.error("Error updating rating:", error);
    } else {
      console.log("Rating updated successfully");
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)} // Updates the rating when a star is clicked
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "yellow" : "gray"} // Sets the color based on the rating
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="cursor-pointer"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
