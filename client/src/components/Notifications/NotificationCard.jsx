import React, { useState } from 'react';
import axiosInstance from '../Axios';
import { images, photos } from '../rec_urls';
export default function NotificationCard({ notification  }) {
 
  
  return (
    <div key={notification._id} className="mb-4 p-4 bg-white shadow-xl">
      <div className="flex items-center justify-between">
      {notification.photo && (
        <img
          src={`${photos}${notification.userphoto}`}
          alt="photo"
          className="w-8 h-8 md:w-16 md:h-16 rounded-full"
        />
      )}
        <h3 className="text-sm md:text-lg font-bold">{notification.username}
         {notification.type=="like"?" liked your article ":" commented on your article "} {notification.title}</h3>
        {notification.photo && (
        <img
          src={`${images}${notification.photo}`}
          alt="Article"
          className=" w-16 h-16  rounded-md object-cover"
        />
      )}
      </div>
       
    </div>
  );
}
