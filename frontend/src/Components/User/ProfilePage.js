import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import ShareMenu from './ShareMenu';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const [data,setData] = useState({})
    const [currentUrl,setCurrentUrl] = useState(window.location.href);
    console.log(currentUrl)
    const {profile}=useParams()
    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get('/me');
        });
      
        fetchData();
      }, []);
  return (
    <>
    <div className="min-h-screen bg-white text-center px-4 sm:px-8">
  <div className="max-w-3xl mx-auto pt-8">
    <div className="relative">
      <img
        src={data.image}
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-4 border-gray-200"
      />
    </div>
    <h1 className="mt-4 text-2xl font-bold text-gray-800">{data.firstname}</h1>
    <p className="text-sm text-gray-600">{data.about}</p>
    <p className="text-sm text-gray-600">@{data.username}</p>
    {data.following==[] ? (
  <p className="mt-2 text-sm text-gray-600">{data.following} following</p>
) : (
  <p className="mt-2 text-sm text-gray-600">0 following</p>
)}

    <div className="flex justify-center mt-4 space-x-4">
    <ShareMenu pro={currentUrl}/>

      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200">
        Edit Profile
      </button>
    </div>
  </div>

  <div className="mt-8 max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
    <div className="aspect-w-1 aspect-h-1">
      <img
        src="image1.jpg"
        alt="Gallery Image"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="aspect-w-1 aspect-h-1">
      <img
        src="image2.jpg"
        alt="Gallery Image"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  </div>
</div>

    </>
  )
}

export default ProfilePage