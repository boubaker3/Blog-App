import React, { useState } from 'react';
import axiosInstance from '../Axios';
import { images, photos } from '../rec_urls';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterIcon} from '@heroicons/react/24/solid';
import { useEffect } from 'react';
export default function ArticleCard({ article, onDelete,liked }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const [isLiked, setIsLiked] = useState(article.likes.includes(userId));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleDelete = () => {
    axiosInstance
      .delete(`/articles/delete/${article._id}`)
      .then(() => {
        onDelete(article._id);
      })
      .catch((error) => {
        console.error('Failed to delete article:', error);
      });
  };

  const handleLike = () => {
    axiosInstance
      .post(`/articles/like/${article._id}`, { userId })
      .then(() => {
        setIsLiked(!isLiked);
        liked();
      })
      .catch((error) => {
        console.error('Failed to update like:', error);
      });
  };


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/articles/comments/${article._id}`, {
        userid:article.userid,
        username:article.username,
        photo:article.userphoto,
        comment,

      });
      console.log("Comment posted:", response.data);
      // You can perform additional actions after successfully posting the comment
      setComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/articles/comments/${article._id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };
useEffect(()=>{
  fetchComments();
},[handleCommentSubmit])  
  return (
    <div key={article._id} className="mb-4 p-4 bg-white shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{article.title}</h3>
        {article.userid === userId && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500">
        By {article.username} | Category: {article.category}
      </p>
      {article.photo && (
        <img
          src={`${images}${article.photo}`}
          alt="Article"
          className="mt-2 w-full object-cover"
        />
      )}
      <p className="mt-2">{article.content}</p>
      <div className="flex items-center">  
        <button
        className= 'flex items-center mt-2 text-gray-500 hover:text-blue-500 focus:outline-none text-blue-500'  
          
        onClick={handleLike}
      >
        {
         isLiked? 
         <HeartIconSolid className="w-5 h-5 mr-1 text-blue-500" />
         :
         <HeartIconOutline className="w-5 h-5 mr-1 text-blue-500" />
      }
          <span>{article.likesCounter>1?article.likesCounter+" persons liked this article":
          article.likesCounter+" person liked this article"} </span>
      </button>
      <button
        className= 'flex items-center mt-2 ml-4 text-gray-500 hover:text-blue-500 focus:outline-none text-blue-500'  
           
      >
         <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-1 text-blue-500" />
   
          <span>{article.commentsCounter>1?article.commentsCounter+"comments":
          article.commentsCounter+"comment"} </span>
      </button>
      </div>
      <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:border-blue-500"
          placeholder="Write your comment here"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Post Comment
        </button>
      </form>
      <hr />
      <br />
      {comments.length > 0 ? (
  comments.map((comment) => (
   
    <div key={comment._id}>
    <div className='flex items-center  '>
        <img src={`${photos}${comment.photo }`} className="w-8 h-8  rounded-md"/>
      <p className='font-bold text-sm ml-2'>{comment.username}</p>
      </div>
      <p className='text-sm m-2'>{comment.comment}</p>
      <br />
      <hr />
    </div>
  ))
) : (
  <p>No comments available</p>
)}
    </div>
    </div>
  );
}
