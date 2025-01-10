import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "./ProductDisplay.css";
import axiosInstance from "../Utils/AxioaInstance";

const ViewPostDetails = () => {
  const { id } = useParams();
const [data, setData] = useState([]);

useEffect(() => {
    const fetchUsers = async () => {
        const response = await axiosInstance.get(`/post/${id}`);
        setData( response.data.onepost);
      
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]); // Depend on _id to ensure it runs when the data changes

const navigate = useNavigate()
  if (!data) {
    return <p>Loading...</p>;
  }

 

 console.log(data)
  

  return (
    <>
    <div className="min-h-screen px-4 py-3 lg:ml-60 sm:px-6 sm:ml-0 lg:px-8">

    <div className="flex justify-center bg-gray-50 items-center h-screen">
  <div className="grid grid-cols-2 gap-8 max-w-6xl bg-white shadow-md ">
    <div className="relative">
      <img src={data.image} alt={data.title} className="w-[400px] h-[400px] object-cover rounded-lg " />
    </div>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black pr-8">{data.title}</h2>
      <p className="text-xs text-gray-500 dark:text-gray-400">{data._id}</p>
      <p className="text-xl text-gray-900 dark:text-black">{data.description}</p>
      <p className="text-md text-gray-900 dark:text-black">{data.category?.name}</p>
      <p className="text-md text-gray-900 dark:text-black hover:underline" onClick={() => navigate(`/view/${data.owner?._id}`)}>owner: {data.owner?.username}</p>


     
    </div>
  </div>
</div>
</div>

    </>
  );
};

export default ViewPostDetails;