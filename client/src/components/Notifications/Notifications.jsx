import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios";
import Categories from "../Feed/Categories";
import Menu from "../Feed/Menu";
import Header from "../Header";
import NotificationCard from "./NotificationCard";

export default function Notifications(onSearch) {
  const [notifications, setNotifications] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(`/articles/notifications/${user._id}`
    );
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [ ]);
  
  const handleAddArticle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

 

  return (
    <div>
          <Header onSearch={setSearch} handleAddArticle={handleAddArticle}/>
          
 <div className="md:flex bg-white">
 <div className="md:flex ">
      <div className="w-full md:w-72 p-4  ">
  <div className="flex fixed  mt-16 ">
  <Menu />
  </div>
</div>
</div>
      <div className="w-full md:w-1/2 md:ml-4 flex justify-center mt-24">
        <div className="w-full p-4  justify-center">
        <h1 className="text-xl font-bold">Notifications</h1>
       {notifications.length !== 0 ? 
              (
                notifications.map((notification) => (
                <NotificationCard
                 
                notification={notification}
                  key={notification._id}
                   
                />
              ))
            ): (
              <div className="w-full p-4 ">
                <h2 className="text-xl font-bold">There are no available notifications!</h2>
              </div>
            ) }
          </div>
          
        </div>
        <div className="w-full md:w-96 p-4  overflow-auto mt-24">
  <div className="flex fixed ">
  <Categories onSelectCategory={setCategory} />
  </div>
</div>
      </div>
    </div>
  );
}
