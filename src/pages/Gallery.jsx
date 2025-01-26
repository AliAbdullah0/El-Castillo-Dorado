import { useEffect, useState } from "react";
import ParallaxScroll from "../components/ui/ParrallaxScroll";
import { useMenus } from "../context/Items";
import { Link } from "react-router-dom"; // To create the link to add an item

function Gallery() {
  const [images, setImages] = useState([]);
  const { menus, loading, error } = useMenus();

  useEffect(() => {
    if (menus && Array.isArray(menus)) {
      const extractedImages = menus.map((menu) => menu.image_url);
      setImages(extractedImages);
    }
  }, [menus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40rem]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 rounded shadow-lg">
        <p className="text-lg text-red-700">
          Error: {error.message || "Failed to load images."}
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">No Images currently</h2>
              <Link
                to="addItem"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Add Item
              </Link>
            </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParallaxScroll images={images} />
      <div className="absolute top-5 left-5">
        <Link
          to="addItem"
          className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700"
        >
          Add Item
        </Link>
      </div>
    </div>
  );
}

export default Gallery;
