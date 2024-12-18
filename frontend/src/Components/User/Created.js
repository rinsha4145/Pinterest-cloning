import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';

function Created() {
const [data,setData]=useState([])
    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get('/postss');
            setData(response.data.posts); 
            console.log("vvv",data)
        });
      
        fetchData();
      }, [data.title]);
  return (
   <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative  p-4 rounded-lg">
        {data.map((post) => (
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
  )
}

export default Created