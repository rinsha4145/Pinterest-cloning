import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import { useSelector } from "react-redux";
import Home from "./Home";
import Category from "./Category";

const ViewPost = () => {
  const {_id}=useParams()
  const [data, setData] = useState(null);   // State to store fetched data
  const { posts } = useSelector((state) => state.posts);
  useEffect(() => {
    const fetchData =handleAsync( async () => {
        const response = await axiosInstance.get(`/post/${_id}`);
        setData(response.data.onepost); 
    });
    
    fetchData();
}, [_id]);
const filteredPosts = posts.filter(post => post.category?.name === data?.category?.name);
console.log("kk",filteredPosts)
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-screen-lg h-[500px] w-[800px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Content Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Image Section */}
          
          <div className="w-full md:w-1/2">
            <img
              src={data?.image} 
              alt="Pin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Details Section */}
          <div className="w-full md:w-1/2 p-6">
            {/* Icons Section */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  ❤️
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  ↻
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  ...
                </button>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Save
              </button>
            </div>

            {/* Details Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
              <p className="text-gray-500">Likes</p>
            </div>

            {/* User Info Section */}
            <div className="flex items-center mt-6">
            {data?.owner?.profileimage ? (
            <img src={data?.owner?.profileimage} alt="Profile"  className="h-10" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              <div className="ml-4">
                <h3 className="font-bold">{data?.owner?.firstname}</h3>
                <p className="text-gray-500">{data?.owner?.followers?.length || 0} followers</p>

              </div>
              <button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-100">
                Follow
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h4 className="font-bold">No comments yet</h4>
              <p className="text-gray-500 mt-2">Add one to start the conversation.</p>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* More to Explore Section */}
      <div className="mt-8">
        <h3 className="flex justify-center text-lg font-bold mb-4">More to explore</h3>
      <Category category={data?.category?.name}/>
      </div>
    </div>
  );
};

export default ViewPost;
