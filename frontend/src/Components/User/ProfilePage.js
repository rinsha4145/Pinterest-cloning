import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import ShareMenu from './ShareMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Created from './Created';
import Saved from './Saved';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Created");
  const [active, setActive] = useState("");

    const [data,setData] = useState({})
    const [currentUrl,setCurrentUrl] = useState(window.location.href);
    const navigate =useNavigate()
    // console.log(currentUrl)
    const {profile}=useParams()

    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get('/me');
            setData(response.data.profile)
        });
        fetchData();
      }, []);
  return (
    <>
     <div className=" min-h-screen flex flex-col items-center">
     <div className="w-full max-w-4xl text-center mt-10 px-4 sm:px-6">
     <div className="flex justify-center">
      <img
        src={data.profileimage}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full md:w-32 md:h-32 object-cover"
      />
    </div>
    <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">{data.firstname}</h1>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">{data.about}</p>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">@{data.username}</p>
    {data.followers? (
  <p className="mt-2 text-sm sm:text-base text-gray-600">{data.followers} following</p>
) : (
  <p className="mt-2 text-sm sm:text-base text-gray-600">0 following</p> 
)}

    {/* <div className="flex justify-center mt-4 space-x-4"> 
    <ShareMenu pro={currentUrl}/> 
    </div>
    <button
      onClick={() => navigate('/settings')}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
    >
      Edit Profile
    </button> */}
    <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className={`px-4 sm:px-6 py-2 border border-gray-300 rounded-full ${
              active === "Share"
                ? "bg-black text-white"
                :"bg-gray-200   hover:bg-gray-100 transition duration-300"}`}
                onClick={() => setActive("Share") }>
            Share
          </button>
          <button  onClick={() => navigate('/settings')} className="px-4 sm:px-6 py-2 bg-gray-200  rounded-full hover:bg-gray-300 transition duration-300">
            Edit profile
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
        {activeTab==="Created"?
        <Created/>:<Saved/>}
</div>
    </>
  )
}

export default ProfilePage