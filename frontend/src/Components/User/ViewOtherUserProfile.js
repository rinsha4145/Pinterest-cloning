import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import ShareMenu from './ShareMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Created from './Created';
import Saved from './Saved';

function ViewOtherUserProfile() {
  const [activeTab, setActiveTab] = useState("Saved");
  const [active, setActive] = useState("");
  const [boards, setBoards] = useState([]);

    const [data,setData] = useState({})
    const [currentUrl,setCurrentUrl] = useState(window.location.href);
    const navigate =useNavigate()
    // console.log(currentUrl)
    const {id}=useParams()

    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get(`/profile/${id}`);
            setData(response.data.userProfile)
        });
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get(`/board/${id}`);
            setBoards(response.data.boards)
            console.log(response.data.boards)
        });
        fetchData();
      }, []);
      console.log(boards)
  return (
    <>
     <div className=" min-h-screen flex flex-col items-center">
     <div className="w-full max-w-4xl text-center mt-10 px-4 sm:px-6">
     <div className="flex justify-center">
       {data?.profileimage ? (
               <img
                 src={data?.profileimage}
                 alt="User Profile"
                 className="w-32 h-32 rounded-full object-cover"
               />
             ) : (
               <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center pb-3 justify-center text-black text-lg">
                 {data?.username ? data?.username[0].toUpperCase() : ''}
               </div>
             )}
    </div>
    <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">{data?.firstname}</h1>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">{data?.about}</p>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">@{data?.username}</p>
    <p className="mt-2 text-sm sm:text-base text-black-600">
  {data?.followers ? `${data?.followers} followers` : '0 followers'} · {data?.following ? `${data?.following} following` : '0 following'}
</p>


   
    <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className={`px-4 sm:px-6 py-2 border border-gray-300 rounded-full ${
              active === "Share"
                ? "bg-black text-white"
                :"bg-gray-200   hover:bg-gray-100 transition duration-300"}`}
                onClick={() => setActive("Share") }>
            Share
          </button>
          <button className={`px-4 sm:px-6 py-2 border border-gray-300 rounded-full ${
              active === "Share"
                ? "bg-black text-white"
                :"bg-gray-200   hover:bg-gray-100 transition duration-300"}`}
                onClick={() => setActive("Share") }>
            Share
          </button>
          <button  onClick={() => navigate('/settings')} className="px-3 sm:px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
            Follow
          </button>
        </div>
   
  </div>
  <div className="mt-8 border-b flex justify-center space-x-6 sm:space-x-8  text-sm sm:text-base">
          <button className={`pb-2 ${activeTab === "Created"
                ? "font-semibold border-b-2 border-black text-black"
                :"font-semibold   pb-2" }`}
                onClick={() => {setActiveTab("Created")}}>
            Created
          </button>
          <button className={`pb-2 ${
              activeTab === "Saved"
                ? "font-semibold border-b-2 border-black text-black"
                :"hover:text-gray-800 pb-2"}`}
                onClick={() => setActiveTab("Saved")}>Saved</button>
        </div>
        {activeTab==="Saved"?(
        <>
        { boards ?(
      <>
    <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
     
      {/* Dynamic Folders */}
      {boards.map((folder) => (
        <div
          key={folder._id}
          onClick={() => navigate(`/viewboard/${folder._id}`)}
          className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
        >
          {/* Image Previews */}
          <div className="flex -space-x-2 mb-4">
            {Array.isArray(folder.posts) &&
              folder.posts.slice(-3).map((img, index) => {
                if (!img || !img.image) return null; // Skip rendering if img or img.image is missing
                return (
                  <img
                    key={index}
                    src={img.image}
                    alt={`Preview ${index + 1}`}
                    className="w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
                  />
                );
              })}
          </div>
          {/* Folder Title and Info */}
          <h2 className="text-lg font-semibold truncate">
            {folder.name || 'Untitled Folder'}
          </h2>
          <p className="text-gray-500 text-sm">
            {Array.isArray(folder.posts) ? folder.posts.length : 0} Pins ·{' '}
            {folder.updatedAt ? new Date(folder.updatedAt).toLocaleDateString() : 'Unknown Date'}
          </p>
        </div>
      ))}
    </div>
    </>
    ):(
      <>
  

    </>
    )}
        </>
        ):(
          <>
          </>
        )}
</div>
    </>
  )
}

export default ViewOtherUserProfile