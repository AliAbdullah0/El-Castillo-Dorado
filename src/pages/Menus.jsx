import React, { useEffect, useState, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../components/ui/UseOutsideClick";
import { Link } from "react-router-dom";
import { useMenus } from "../context/Items";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import { supabase } from "../../supabase/SupabaseClient";

function Menus() {
  const [active, setActive] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [recommendedSearches, setRecommendedSearches] = useState([]);
  const { menus, loading, error } = useMenus();
  const ref = useRef(null);

  const filterItemsByCategory = (category) => {
    const filtered = menus
      ?.filter((item) => item.category === category)
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return filtered?.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  };

  const handleViewOnMap = (address) => {
    const encodedAddress = encodeURIComponent(address); 
    const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`;
  
    window.open(googleMapsUrl, "_blank");
  };

  useOutsideClick(ref, () => setActive(null));

  const handleRating = async () => {
    try {
      setRatingLoading(true);

      const { data: currentData, error: fetchError } = await supabase
        .from("menus")
        .select("rating")
        .eq("id", active.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current ratings:", fetchError);
        setRatingLoading(false);
        return;
      }

      const updatedRatings = [...(currentData.rating || []), parseInt(rating, 10)];
      const totalRatings = updatedRatings.reduce((acc, curr) => acc + curr, 0);
      const avgRating = totalRatings / updatedRatings.length;

      const { error } = await supabase
        .from("menus")
        .update({ rating: updatedRatings, averageRating: avgRating })
        .eq("id", active.id);

      if (error) {
        console.error("Error updating rating:", error);
      } else {
        setAverageRating(avgRating);
      }
    } catch (error) {
      console.error("Unexpected error while updating rating:", error);
    } finally {
      setRatingLoading(false);
    }
  };

  const renderStars = (rating, max = 5) => {
    const fullStarPath = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"; // Full star SVG path
    const halfStarPath = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"; // Half star SVG path

    return Array.from({ length: max }, (_, i) => {
      const starRating = rating - i;
      const isFull = starRating >= 1;
      const isHalf = starRating > 0 && starRating < 1;

      return (
        <svg
          key={i}
          width="20"
          height="20"
          className={
            isFull
              ? "text-yellow-500 cursor-pointer"
              : isHalf
                ? "text-yellow-500 cursor-pointer"
                : "text-gray-300 cursor-pointer"
          }
          onClick={() => setRating(i + 1)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={isHalf ? halfStarPath : fullStarPath} />
        </svg>
      );
    });
  };

  const renderSection = (title, category) => {
    const filteredItems = filterItemsByCategory(category);
  
    if (!filteredItems || filteredItems.length === 0) return null;
  
    return (
      <div className="mb-8">
        <h2 className="text-4xl font-light mb-4">
          <span>| </span>
          {title}
        </h2>
        <ul className="grid gap-4">
          {filteredItems.map((item) => (
            <motion.div
              layoutId={`card-${item.id}`} // Use item.id here
              key={item.id} // Use item.id here
              onClick={() => setActive(item)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-[#d3ccb7] rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col items-center md:flex-row">
                <motion.div layoutId={`image-${item.id}`}> {/* Use item.id */}
                  <ImageWithSkeleton
                    src={item.image_url}
                    alt={item.title}
                    className="h-40 w-40 object-center object-cover md:h-14 md:w-14"
                  />
                </motion.div>
                <div>
                  <motion.h3
                    layoutId={`title-${item.id}`} // Use item.id
                    className="font-medium text-neutral-800 text-center md:text-left"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${item.id}`} // Use item.id
                    className="text-neutral-600 text-center md:text-left"
                  >
                    {item.description}
                  </motion.p>
                  {item.averageRating > 4 && (
                    <span className="text-green-600 font-bold text-sm">Recommended</span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {renderStars(item.averageRating || 0)}
                <span className="ml-2 text-neutral-600">({item.averageRating?.toFixed(1) || "0.0"})</span>
              </div>
              <motion.p
                layoutId={`price-${item.id}`} // Use item.id
                className="font-bold text-lg text-orange-600 mt-4 md:mt-0"
              >
                Rs {item.price}
              </motion.p>
            </motion.div>
          ))}
        </ul>
      </div>
    );
  };
  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const recommended = menus
      .map((item) => item.title)
      .filter((title) => title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);

    setRecommendedSearches(recommended);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {active && (
              <>
                <div className="fixed inset-0 grid place-items-center z-[100]">
                  <motion.div
                    layoutId={`card-${active.id}`}
                    ref={ref}
                    className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-general shadow-2xl overflow-hidden"
                  >
                    <div className="flex bg-transparent justify-between items-center p-4">
                      {/* Back Button */}
                      <button
                        onClick={() => setActive(null)}
                        className="text-lg text-neutral-700 font-semibold hover:text-orange-600"
                      >
                        &#8592; Back
                      </button>
                    </div>

                    <motion.div layoutId={`image-${active.id}`}>
                      <img
                        src={active.image_url}
                        alt={active.title}
                        className="w-full h-80 lg:h-80 object-center object-cover"
                      />
                    </motion.div>

                    <div>
                      <div className="flex justify-between items-start p-4">
                        <div>
                          <motion.h3
                            layoutId={`title-${active.id}`}
                            className="font-bold text-neutral-700"
                          >
                            {active.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${active.id}`}
                            className="text-neutral-600"
                          >
                            {active.description}
                          </motion.p>
                          <motion.div className="text-neutral-600 flex gap-1 mt-2">
                            <img src="/location-pin.png" alt="Address" className="h-5"/> {active.address}
                          </motion.div>
                          <button
                            onClick={() => handleViewOnMap(active.address)}
                            className="text-blue-600 hover:text-blue-700 mt-2"
                          >
                            View on Map
                          </button>
                          <motion.p className="text-neutral-600 mt-2">
                            <strong>Average Rating:</strong> {active.averageRating?.toFixed(2) || "Not Rated Yet"}
                          </motion.p>
                        </div>
                        <motion.p
                          layoutId={`price-${active.id}`}
                          className="font-bold text-lg text-orange-600"
                        >
                          Rs {active.price}
                        </motion.p>
                      </div>
                      <div className="flex gap-2 justify-between items-center p-4">
                        <strong>Rate:</strong>
                        <div className="flex gap-2 items-center h-full w-full">
                          {renderStars(rating)}
                          <button
                            onClick={handleRating}
                            className="px-2 py-1 bg-orange-600 text-white text-sm rounded-md"
                          >
                            {ratingLoading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-white"></div>
                            ) : (
                              "Rate"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          <div className="container mx-auto bg-general p-6">
            <div className="flex gap-3 w-full mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for places or food items..."
                className="w-full px-3 py-1.5 border border-orange-600 rounded-lg outline-none"
              />
              <Link
                to="addItem"
                className="px-2 py-1.5 rounded-md bg-orange-600 text-white hover:border hover:border-orange-600 hover:text-gray-600 hover:bg-transparent"
              >
                Add
              </Link>
            </div>

            {recommendedSearches.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Recommended Searches</h3>
                <ul className="list-disc pl-5">
                  {recommendedSearches.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {renderSection("Main Courses", "Main Course")}
            {renderSection("Desserts", "Dessert")}
            {renderSection("Drinks", "Drinks")}
            {renderSection("Fast Food", "Fast Food")}
            {renderSection("Chinese", "Chinese")}
            {renderSection("Desi", "Desi")}
            {renderSection("Snacks", "Snacks")}
            {renderSection("Hotels", "Hotel")}
            {renderSection("Restaurants", "Restaurant")}
          </div>
        </>
      )}
    </>
  );
}

export default Menus;
