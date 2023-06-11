import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid';
import {photos} from './rec_urls';
import axiosInstance from './Axios';
export default function Header({onSearch,handleAddArticle}) {
    const [search, setSearch] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username;

    return (
    <div className="w-full flex justify-between items-center p-4 bg-white fixed  ">
        <div className="md:w-1/6 hidden md:flex">
          <h2 className=" md:text-base lg:text-lg font-bold">Blog App</h2>
        </div>
        <div className="  w-full md:w-1/2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) =>{ setSearch(e.target.value);onSearch(e.target.value)}}
          />
        </div>
        <div className="flex">
        <p className="text-sm md:text-base lg:text-lg ml-2 font-bold hidden md:flex mr-2"> {username}!</p>
        <div className="rounded-md bg-blue-500 w-8 h-8 items-center justify-center  mr-2">
          <button
            onClick={handleAddArticle}
            className="rounded-md bg-blue-500 w-8 h-8 flex items-center justify-center  mr-6"
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </div> 
        <img src={`${photos}${user.photo}`} className="w-8 h-8  rounded-md"/>
        </div> 
      </div>
  )
}
