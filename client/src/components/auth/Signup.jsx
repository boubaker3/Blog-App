import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../Axios";
import { signup } from "./AuthApi";
import user from '../assets/user.png';
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    signup({photo,username, email,password});
    
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white w-1/3 p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl text-center mb-4 font-bold">Signup</h2>
        <form onSubmit={handleSignup}>
        <div className="mb-4 w-full ">
            <label htmlFor="photo" className="block mb-2 cursor-pointer">
              <img
                src={photo ? URL.createObjectURL(photo) :user }
                alt="Selected Photo"
                className="mt-2  w-64 h-64 rounded-full cursor-pointer  "
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
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="/login" className="text-gray-500">
              Already have an account?
            </a>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
