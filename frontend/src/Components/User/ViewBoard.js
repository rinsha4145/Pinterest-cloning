import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useNavigate, useParams } from 'react-router-dom';
import ShareMenu from './ShareMenu';

function ViewBoard() {
    const {id}=useParams()
    const [data, setData] = useState(null);   // State to store fetched data
    const [isShareMenuVisible, setShareMenuVisible] = useState(false);

    const handleShareClick = (post) => {
        setShareMenuVisible((prev) => !prev); // Toggle visibility
      };
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get(`/viewbyid/${id}`);
            setData(response.data.board);
           
        };
        fetchData();
    }, []);
    
      
  return (
   <>
    <div className="p-6 max-w-screen-lg mx-auto">
      {/* Title and Subtitle */}
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{data?.name}</h1>
          <p className="text-gray-500 mt-2 md:mt-0">{data?.posts.length}</p>
        </div>

        {/* Avatar and Collaborators */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">+</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">More ideas</span>
        </button>
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">Organise</span>
        </button>
      </div>
    </div>
 
    <div className="container">
   
  {data?.posts?.map((post) => (
    <div
      className="relative group box" 
      key={post._id}
    >
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto object-cover"
      />

    <p>{post.title}</p>
    </div>
  ))}
</div>
   
   </>  

  )
}

export default ViewBoard