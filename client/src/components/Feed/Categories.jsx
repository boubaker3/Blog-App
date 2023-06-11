import React from "react";

export default function Categories({ onSelectCategory }) {
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

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
  };

  return (
    <div  >
      <h3 className=" text-base md:text-xl mb-6 font-bold display-none md:display-block">Categories</h3>
      <ul className="flex md:block">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategorySelect(category)}
            className="cursor-pointer text-blue-500 font-bold mt-2  bg-gray-100 pt-2 pb-2 pl-4 pr-4 ml-6 md:ml-2"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
