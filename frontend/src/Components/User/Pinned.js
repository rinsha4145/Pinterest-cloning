import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Home/Home.css'
import ShareMenu from '../User/ShareMenu';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import {addSavedFolder,removeSavedFolder,setSavedFolders} from '../Redux/SavedSlice'
import OutsideClickHandler from 'react-outside-click-handler';

function Pinned() {
    const saved = useSelector((state) => state.save.save);
    const [isShareMenuVisible, setShareMenuVisible] = useState(false);
      const dispatch = useDispatch()
    
    const handleShareClick = (post) => {
        setShareMenuVisible((prev) => !prev); // Toggle visibility
      };
      const fetchData = async () => {
        const response = await axiosInstance.get("/saves");
        dispatch(setSavedFolders(response.data.getsaved?.posts));
      };
      useEffect(() => {
        const fetchDataWrapper = handleAsync(fetchData);
        fetchDataWrapper();
      }, [dispatch]);

      const handleDelete = handleAsync(async(postid)=>{
        const response=await axiosInstance.delete(`/removesaved`, {
          data: { postId: postid },
        })
        const Data = response.data.data;
        console.log(response.data.data)
        handleAsync(fetchData)()
        dispatch(removeSavedFolder(Data))
      });
  return (
   <>
    <h1 className='flex justify-center text-2xl'>All Pins</h1>
   <div className="container ">
   
  {saved?.map((post) => (
    <div
      className="relative group box" 
      key={post?._id}
    >
      {/* Image */}
      <img
        src={post?.image}
        alt={post?.title}
        className="w-full h-auto object-cover"
      />

      {/* Hover Content */}
      <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <div className="text-center relative w-full h-full">
  <button className="absolute top-4 left-2 text-base font-semibold text-white px-2 py-1 rounded flex items-center space-x-2 group-hover:bg-opacity-100 opacity-70 hover:opacity-100 transition-opacity duration-300">
      Quick saves
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <button className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700">
      Save
    </button>
    <button
    className=" absolute p-2 bottom-2 right-12 bg-gray-100 rounded-full hover:bg-gray-200 text-black"
    onClick={() => handleShareClick(post)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  </button>
  {isShareMenuVisible && (
            <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
            <div className="absolute top-[400px] bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
            <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible}/>
                
                </div> 
                </OutsideClickHandler>
                
              )}
    <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" onClick={()=>handleDelete(post._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
  </div>
</div>
    </div>
  ))}
</div>
   </>
  )
}

export default Pinned