import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios";
import ArticleCard from "./ArticleCard";
import Categories from "./Categories";
import Menu from "./Menu";
import AddArticleDialog from "./AddArticleDialog";
import Header from "../Header";

export default function Feed() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/articles", {
        params: {
          category,
          search,
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [user._id, category, search]);
  
  const handleAddArticle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const refreshArticles = () => {
    fetchArticles();
  };

  return (
    <div>
          <Header onSearch={setSearch} handleAddArticle={handleAddArticle}/>

      <div className="md:flex bg-white">
      <div className="w-full md:w-72 p-4  ">
  <div className="flex fixed  mt-16 ">
  <Menu />
  </div>
</div>
        <div className="w-full md:w-1/2 md:ml-4 flex justify-center mt-24">
        <div className="w-full p-4  justify-center">
        <h1 className="text-xl font-bold">Feed</h1>
       {articles.length !== 0 ? 
              (
              articles.map((article) => (
                <ArticleCard
                onArticleAdded={refreshArticles} 
                article={article}
                  key={article._id}
                  onDelete={refreshArticles}
                  liked={refreshArticles}
                />
              ))
            ): (
              <div className="w-full p-4 ">
                <h2 className="text-xl font-bold">There are no available articles!</h2>
              </div>
            ) }
          </div>
          {isDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <AddArticleDialog
                onClose={handleAddArticle}
                onArticleAdded={refreshArticles}
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-96 p-4 overflow-auto mt-24 bg-white">
  <div className="flex fixed ">
  <Categories onSelectCategory={setCategory} />
  </div>
</div>
      </div>
    </div>
  );
}
