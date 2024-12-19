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

import React, { useEffect } from 'react';
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSavedFolders,
} from '../Redux/SavedSlice';
import { setBoards } from '../Redux/BoardSlice';
import { useNavigate } from 'react-router-dom';

function Saved() {
  const savedFolders = useSelector((state) => state.saved.savedFolders);
  const boards = useSelector((state) => state.board.boards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract the last 5 images from savedFolders
  const lastFiveImages = savedFolders.slice(-5).map((post) => post?.image || 'default-image.jpg'); // Fallback for missing images

  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const response = await axiosInstance.get('/saves');
      dispatch(setSavedFolders(response.data.getsaved.posts || [])); // Ensure posts fallback to an empty array
      const res = await axiosInstance.get('/viewboards');
      dispatch(setBoards(res.data.boards || [])); // Ensure boards fallback to an empty array
    });
    fetchData();
  }, [dispatch]);

  return (
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
        <p className="text-gray-500">{savedFolders.length} Pins</p>
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
          <p className="text-gray-500">
            {Array.isArray(folder.posts) ? folder.posts.length : 0} Pins ·{' '}
            {folder.time ? new Date(folder.time).toLocaleDateString() : 'Unknown Date'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Saved;
