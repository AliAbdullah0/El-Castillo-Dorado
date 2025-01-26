import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/SupabaseClient";

function AddMenuItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    address: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-fetch image preview for URL
    if (name === "image_url" && value) {
      setImage(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    const res = await fetch("https://api.cloudinary.com/v1_1/dmvom0tnv/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, description, price, category, address, username } = formData;

    try {
      let imageUrl = formData.image_url;
      if (image && typeof image !== "string") {
        imageUrl = await uploadImageToCloudinary(image);
      }

      const { data, error } = await supabase.from("menus").insert([
        {
          title,
          description,
          price: parseFloat(price),
          category,
          image_url: imageUrl,
          address,
          username,
        },
      ]);

      if (error) {
        throw error;
      }

      setMessage("Menu item added successfully!");
      setShowNotification(true);

      // Hide the notification and refresh the page after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 pr-6">
        <h2 className="text-4xl font-light mb-4">
          <span>| </span>
          Suggest A Place Or Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-orange-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-orange-300 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-orange-300 rounded"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-orange-300 rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Chinese">Chinese</option>
            <option value="Dessert">Dessert</option>
            <option value="Desi">Desi</option>
            <option value="Snacks">Snacks</option>
            <option value="Drinks">Drinks</option>
          </select>

          {/* Image Input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-orange-300 rounded"
          />
          <input
            type="url"
            name="image_url"
            placeholder="Or paste image URL"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-500 disabled:bg-gray-700 text-white rounded hover:bg-orange-600 flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-white"></div>
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </div>

      {/* Image Preview */}
      <div className="w-full lg:w-1/2 pl-6 flex justify-center items-center mt-4 lg:mt-0">
        {image && (
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="Image Preview"
            className="max-w-full h-auto rounded-md"
          />
        )}
      </div>

      {/* Notification */}
      {showNotification && (
        <aside className="fixed bottom-4 end-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-orange-600 px-5 py-3 text-white">
          <span className="text-sm font-medium">Item Added!</span>
        </aside>
      )}
    </div>
  );
}

export default AddMenuItem;
