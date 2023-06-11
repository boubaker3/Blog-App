import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const categories = [
    "Feed",
    "Notifications",
    "Favourites",
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  let location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/Feed':
        setSelectedCategory("Feed");
        break;
      case '/Notifications':
        setSelectedCategory('Notifications');
        break;
      case '/Favourites':
        setSelectedCategory("Favourites");
        break;
      default:
        setSelectedCategory("null");
    }
  }, [location.pathname]);
  return (
    <div>
      <ul className="flex md:block">
        {categories.map((category) => (
          <a href={`/${category}`} key={category}>
            <div
              className={`cursor-pointer rounded-lg font-bold mt-2 pt-2 pb-2 pl-4 pr-4 ml-2
                ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </div>
          </a>
        ))}
      </ul>
    </div>
  );
}
