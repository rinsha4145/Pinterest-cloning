// import React, { useEffect, useState } from 'react'
// import handleAsync from '../Utils/HandleAsync';
// import axiosInstance from '../Utils/AxioaInstance';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setSavedFolders,
//   addSavedFolder,
//   removeSavedFolder,
//   clearSavedFolders,
// } from '../Redux/SavedSlice';
// import {setBoards} from '../Redux/BoardSlice';

// import { useNavigate } from 'react-router-dom';

// function Saved() {
//   const savedFolders = useSelector((state) => state.saved.savedFolders);
//   const boards  = useSelector((state) => state.board.boards);
//     const [saved,setsaved] = useState([])
//     const [selectedFolder, setSelectedFolder] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();


// // Extract only the 'image' property from each of these objects
// const lastFiveImages = savedFolders.slice(-5).map((post) => post.image);


    
//     useEffect(() => {
//         const fetchData = handleAsync(async () => {
//             const response = await axiosInstance.get('/saves');
//             dispatch(setSavedFolders(response.data.getsaved.posts));
//             const res=await axiosInstance.get('/viewboards')
//             dispatch(setBoards(res.data.boards))
           
//         });
//         fetchData();
//       }, [dispatch]);
      
//   return (
   
//     <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
//     <div
//       onClick={() => navigate('/pin')}
//       className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
//     >
//       {/* Image Previews */}
//       <div className="flex -space-x-2 mb-4">
//         {lastFiveImages.slice(0, 5).map((img, index) => ( // Display up to 3 images for uniformity
//           <img
//             key={index}
//             src={img}
//             alt={`Preview ${index + 1}`}
//             className="w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
//           />
//         ))}
//       </div>
//       {/* Folder Title and Info */}
//       <h2 className="text-lg font-semibold truncate">All Pins</h2>
//       <p className="text-gray-500">
//         {savedFolders.length} Pins · 
//         {/* {new Date(folder.time).toLocaleDateString()} */}
//       </p>
//     </div>
    
//      {boards.map((folder) => (
//         <div
//           key={folder._id}
//           onClick={() => navigate(`/viewboard/${folder._id}`)}
//           className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
//         >
//           {/* Image Previews */}
//           <div className="flex -space-x-2 mb-4">
//             {folder.posts.slice(-3).map((img, index) => ( // Display up to 3 images for uniformity
//               <img
//                 key={index}
//                 src={img.image}
//                 alt={`Preview ${index + 1}`}
//                 className="grid grid-cols-2 grid-rows-2 w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
//               />
//             ))}
//           </div>
//           {/* Folder Title and Info */}
//           <h2 className="text-lg font-semibold truncate">{folder.name}</h2>
//           <p className="text-gray-500">
//             {folder.posts.length} Pins · {new Date(folder.time).toLocaleDateString()}
//           </p>
//         </div>
          
//       ))}
    

// </div>

      

      
//   )
// }

// export default Saved

import React, { useEffect, useState } from 'react';
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSavedFolders,
} from '../Redux/SavedSlice';
import { setBoards } from '../Redux/BoardSlice';
import { useNavigate } from 'react-router-dom';
import ViewBoard from './ViewBoard';
import CreateBoard from './CreateBoard';
import { useClickHandler } from '../Context/ClickHandlerContext';

function Saved() {
  const saved = useSelector((state) => state.save.save);
  const boards = useSelector((state) => state.board.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isopen,setOpen]=useState(false)
  const [viewBoard,setViewBoard]=useState(false)
    const { setIsOpen,isOpen} = useClickHandler()
  

  const lastFiveImages = saved?.slice(-3).map((post) => post?.image || 'default-image.jpg'); // Fallback for missing images
  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const respond = await axiosInstance.get('/viewboards');
      dispatch(setBoards(respond.data.boards || [])); // Ensure boards fallback to an empty array
    });
    fetchData();
  }, [dispatch]);

  const handleClick = (post) => {
    setOpen((prev) => !prev); // Toggle visibility
  };
  const handleboard = (post) => {
    setIsOpen((prev) => !prev);
    setOpen((prev) => !prev); // Toggle visibility
  };

  return (
    <>
    {saved || boards ?(
      <>
    <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {/* Static Folder for All Pins */}
      <div
        onClick={() => navigate('/pin')}
        className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
      >
        {/* Image Previews */}
        <div className="flex -space-x-2 mb-4">
          {lastFiveImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index + 1}`}
              className="w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
            />
          ))}
        </div>
        {/* Folder Title and Info */}
        <h2 className="text-lg font-semibold truncate">All Pins</h2>
        <p className="text-gray-500">{saved.length} Pins</p>
      </div>

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
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 mt-10">
  <h1 className="text-md ">
    Nothing to show...yet! Pins you create will live here.
  </h1>
  <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition duration-300" onClick={()=>navigate('/create')}>
    Create Pin
  </button>
</div>

    </>
    )}

<div className="relative">
  {/* Other content */}
  <div className="mt-[-40vh] ml-[-65vh] md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
    <button
    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-black "
    onClick={handleClick}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg></button>
    {isopen && (
        <div className="absolute w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
          <p className="px-4 py-2 text-sm text-gray-500">
            create
          </p>
          <div className="border-t border-gray-200">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={()=>navigate("/create")}
            >
              Pin
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleboard}
            >
              Board
            </button>
            
          </div>
        </div>
      )}
    </div>
    </div>
  {isOpen?<CreateBoard/>:""}
    </>
  );
}

export default Saved;
