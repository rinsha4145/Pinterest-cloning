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
console.log(boards)
    const [data,setData] = useState({})
    const [posts,setPosts] = useState([])

    const [currentUrl,setCurrentUrl] = useState(window.location.href);
    const navigate =useNavigate()
    // console.log(currentUrl)
    const {id}=useParams()

    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get(`/profile/${id}`);
            setData(response.data.userProfile)
            const respons = await axiosInstance.get(`/getposts/${id}`);
            setPosts(respons.data.posts);
          
        });
        fetchData();
      }, []);
      console.log(posts)

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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2">
  {Array.isArray(folder.posts) &&
    folder.posts.slice(-3).map((img, index) => {
      if (!img || !img.image) return null; // Skip rendering if img or img.image is missing
      return (
        <div className="relative w-full pt-[75%] bg-gray-400 overflow-hidden rounded-lg" key={index}>
          <img
            src={img.image}
            alt={`Preview ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
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
         
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative  p-4 rounded-lg">
        {posts.map((post) => (
  <div className="relative group box rounded-lg ">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-3xl" />
    <div className="absolute inset-0 bg-black border-radiusfull rounded-3xl bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <button className="absolute top-4 left-2 text-base font-semibold text-white px-2 py-1 rounded flex items-center space-x-2 group-hover:bg-opacity-100 opacity-70 hover:opacity-100 transition-opacity duration-300">
      Quick saves
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <button className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700">
      Save
    </button>
    
   
    <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
</button>
 
</div>
  </div>
))}  
        </div>
      </div>
      </>
  
        )}
</div>
    </>
  )
}

export default ViewOtherUserProfile