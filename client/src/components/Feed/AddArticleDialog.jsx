import React, { useState } from "react";
import axiosInstance from "../Axios";
import gallery from '../assets/gallery.png';
export default function AddArticleDialog({ onClose, onArticleAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user._id;
  const username = user.username;
  const userphoto = user.photo;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("userid", userid);
      formData.append("username", username);
      formData.append("userphoto", userphoto);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      const response = await axiosInstance.post("/articles/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onArticleAdded(response.data); // Notify parent component about the new article
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Failed to add article:", error);
    }
  };

  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Sports",
    "Fashion",
    "Health",
    "Gaming",
    "Music",
    "Art",
    "Science",
    "Business",
    "Education",
  ];

  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-md shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Add Article</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold">
              Content
            </label>
            <textarea
              id="content"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              value={content}
              onChange={handleContentChange}
              required
            />
          </div>
          <div className="mb-4 w-full ">
            <label htmlFor="photo" className="block mb-2 cursor-pointer">
              <img
                src={photo ? URL.createObjectURL(photo) :gallery }
                alt="Selected Photo"
                className="mt-2  w-full h-68 rounded-xl cursor-pointer  "
              />
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold">
              Category
            </label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
