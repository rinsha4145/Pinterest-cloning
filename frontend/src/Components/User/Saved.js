
import React, { useEffect, useState } from 'react';
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useDispatch, useSelector } from 'react-redux';
import {setSavedFolders,} from '../Redux/SavedSlice';
import { useNavigate } from 'react-router-dom';
import ViewBoard from './ViewBoard';
import CreateBoard from './CreateBoard';
import { useClickHandler } from '../Context/ClickHandlerContext';
import OutsideClickHandler from 'react-outside-click-handler';
import { updateBoard } from '../Redux/BoardSlice';

function Saved({id}) {
  const saved = useSelector((state) => state.save.save);
  const boards = useSelector((state) => state.board.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isopen,setOpen]=useState(false)
  const [viewBoard,setViewBoard]=useState(false)
  const [viewEditBoard,setViewEditBoard]=useState(false)
  const { setIsOpen,isOpen} = useClickHandler()
  const [boardData, setBorardData] = useState({
      name: '',
      description: '',
    });

  const lastFiveImages = saved?.slice(-3).map((post) => post?.image || 'default-image.jpg'); // Fallback for missing images
  

  const handleClick = (post) => {
    setOpen((prev) => !prev); // Toggle visibility
  };
  const handleboard = (post) => {
    setIsOpen((prev) => !prev);
    setOpen((prev) => !prev); // Toggle visibility
  };

  const handleEdit = async(id) => {
    setViewEditBoard((prev) => !prev);
    const response = await axiosInstance.get(`/viewbyid/${id}`);
    setBorardData(response.data.board);
    console.log(response.data.board)
  };

  

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setBorardData((prevData) => ({
      ...prevData,
      [name]: value, // Directly update the value for the given input's name
    }));
  };
  
  const handleSubmit = async (board) => {
    console.log("Original Board:", board);
    console.log("Updated Board Data:", boardData);
  
    const updatedData = {};
    Object.keys(boardData).forEach((key) => {
      if (boardData[key] && boardData[key] !== board[key]) {
        updatedData[key] = boardData[key];
      }
    });
  
    console.log("Final Updated Data:", updatedData);
  
    try {
      const response = await axiosInstance.put(`/updateboard/${board._id}`, updatedData);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.board);
  
        dispatch(updateBoard(response.data.board));
        alert('Board updated successfully');
      }
    } catch (error) {
      console.error('Error updating board:', error);
      alert('Failed to update board. Please try again.');
    }
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
          {lastFiveImages?.map((img, index) => (
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
        <p className="text-gray-500">{saved?.length} Pins</p>
      </div>

      {/* Dynamic Folders */}
      {boards.map((folder) => (
        
        <div
          key={folder._id}
          className="cursor-pointer bg-white w-[300px] rounded-lg p-4 transition"
        >
          <div onClick={() => navigate(`/viewboard/${folder._id}`)}>
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

          
          <button
    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-black z-50 " onClick={()=>handleEdit(folder._id)}
   >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg></button>
      

{viewEditBoard && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    {/* Backdrop */}
    {/* <OutsideClickHandler onOutsideClick={() => setViewEditBoard(false)}> */}
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit your board</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setViewEditBoard(false)}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Board Cover */}
          {/* <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
              <img
                src="https://via.placeholder.com/64"
                alt="Board Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="text-sm text-blue-500 hover:underline">
              Change
            </button>
          </div> */}

          {/* Name Input */}
          <div>
            <label
              htmlFor="boardName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="boardName"
              type="text"
              name="name"
              value={boardData.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Board name"
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="boardDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="boardDescription"
              rows="4"
              name="boardDescription"

              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's your board about?"
              value={boardData.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={()=>handleSubmit(folder)}
          >
            Done
          </button>
        </div>
      </div>
    {/* </OutsideClickHandler> */}
  </div>
)}

      

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
