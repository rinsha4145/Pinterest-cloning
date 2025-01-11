
import React, { useEffect, useState } from 'react';
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useDispatch, useSelector } from 'react-redux';
import {setSavedFolders,} from '../Redux/SavedSlice';
import { Link, useNavigate } from 'react-router-dom';
import ViewBoard from './ViewBoard';
import CreateBoard from './CreateBoard';
import { useClickHandler } from '../Context/ClickHandlerContext';
import OutsideClickHandler from 'react-outside-click-handler';
import { updateBoard,deleteBoard } from '../Redux/BoardSlice';

function Saved({id}) {
  const saved = useSelector((state) => state.save.save);
  const board = useSelector((state) => state.board.boards);
  const [boards,setBoards]=useState(board)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isopen,setOpen]=useState(false)
  const [isOpenFilter,setOpenFilter]=useState(false)
  const [sortOption, setSortOption] = useState("A to Z");
  const [viewBoard,setViewBoard]=useState(false)
  const [viewEditBoard,setViewEditBoard]=useState(false)
  const {showBoard,setShowBoard} = useClickHandler()
  const [boardData, setBoardData] = useState({
      name: '',
      description: '',
    });

  const lastFiveImages = saved?.slice(-3).map((post) => post?.image); // Fallback for missing images
  
  useEffect(() => {
    setBoards(board); // Sync local state with Redux state
  }, [board]);
  
  const handleClick = (post) => {
    setOpen((prev) => !prev); // Toggle visibility
  };
  const handleFilter = (post) => {
    setOpenFilter((prev) => !prev); // Toggle visibility
  };

  
  const handleSort = (option) => {
    setSortOption(option);

    let sortedBoards = [...boards]; // Create a copy of the boards array
    if (option === "A to Z") {
      sortedBoards.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    } else if (option === "Last Pin added") {
      sortedBoards.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by last pin date
    }

    setBoards(sortedBoards); // Update the boards state with sorted boards
    setOpenFilter(false); // Close the dropdown
  };
  const handleboard = (post) => {
    setShowBoard((prev) => !prev);
    setOpen((prev) => !prev); // Toggle visibility
  };

  const handleEdit =handleAsync( async(id) => {
    setViewEditBoard((prev) => !prev);
    const response = await axiosInstance.get(`/viewbyid/${id}`);
    setBoardData(response.data.board);
    dispatch(updateBoard(response.data.board))
    console.log(response.data.board)
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setBoardData((prevData) => ({
      ...prevData,
      [name]: value, // Directly update the value for the given input's name
    }));
  };
  
  
  const handleSubmit = async (board) => {
    setViewEditBoard(false);
  
    const updatedData = {};
    Object.keys(boardData).forEach((key) => {
        updatedData[key] = boardData[key];
    });
  
    try {
      const response = await axiosInstance.put(`/updateboard/${boardData._id}`, updatedData);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.board);
  
        dispatch(updateBoard(response.data.board));
  
        setBoards((prevBoards) =>
          prevBoards.map((b) =>
            b._id === response.data.board._id ? response.data.board : b
          )
        );
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  const handleDelete = handleAsync(async () => {
    setViewEditBoard((prev) => !prev);
    try {
      const response = await axiosInstance.delete(`/deleteboard/${boardData._id}`);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.boardId);
  
        dispatch(deleteBoard(response.data.boardId));
  
        setBoards((prevBoards) =>
          prevBoards.filter((b) => b._id !== response.data.boardId)
        );
      }
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete board. Please try again.');
    }
  });
  
  
  return (
    <>
    <div className="flex justify-between items-center w-full">
    <button
    className="p-2  rounded-full hover:bg-gray-200 text-black "
    onClick={handleFilter}>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
  <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
</svg>
</button>
<button
    className="p-2  rounded-full hover:bg-gray-200 text-black "
    onClick={handleClick}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg></button>
    {isopen && (
        <div className="absolute right-0 bottom-[30px] w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
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
      {isOpenFilter && (
      <div className="absolute mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {/* Options */}
            <Link
              onClick={() => handleSort("A to Z")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              A to Z
            </Link>
            <Link
             onClick={() => handleSort("Last Pin added")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black flex justify-between items-center"
            >
              Last Pin added
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </Link>
           
           
          </div>
        </div>
          )}
    </div>

    {saved || boards ?(
      <>
    <div className="grid grid-cols-6 sm:grid-cols-1 lg:grid-cols-4 gap-6 p-8">
      {/* Static Folder for All Pins */}
      <div
  onClick={() => navigate('/pin')}
  className="cursor-pointer bg-white w-[300px] mt-1 rounded-lg p-4 hover:bg-gray-100 transition"
>
  {/* Image Previews */}
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 3 }).map((_, index) => {
      const img = lastFiveImages?.[index];
      return (
        <div
          key={index}
          className="bg-gray-200 w-[100px] h-[150px] rounded-md border border-gray-300 flex items-center justify-center"
        >
          {img ? (
            <img
              src={img}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          ) : ""}
        </div>
      );
    })}
  </div>

  {/* Folder Title and Info */}
  <h2 className="text-lg font-semibold truncate">All Pins</h2>
  <p className="text-gray-500">{saved?.length || 0} Pins</p>
</div>


      {/* Dynamic Folders */}
      {boards.map((folder) => (
        
        <div
          key={folder._id}
          className="cursor-pointer bg-white w-[300px] rounded-lg p-4 transition group relative"
        >
          <div onClick={() => navigate(`/viewboard/${folder._id}`)}>
          {/* Image Previews */}
        
          <div key={folder._id}>
  <div className='z-50'>
  <div onClick={() => navigate(`/viewboard/${folder._id}`)}>
    {/* Image Previews */}
    <div className="flex gap-1 mb-4 ">
      {Array.from({ length: 3 }).map((_, index) => {
        const img = folder?.posts && folder?.posts?.[index];
        return (
          <div
            key={index}
            className="bg-gray-200 w-[100px] h-[150px] rounded-md border border-gray-300 flex items-center justify-center"
          >
            {img ? (
              <img
                src={img?.image}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            ) :  ""}
          </div>
        );
      })}
    </div>
    </div>
    
</div>
<button
      className="absolute text-black bottom-[90px] right-5 bg-black bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      onClick={(e) => {
        e.stopPropagation();
        handleEdit(folder._id);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4">
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
      </svg>
    </button>
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
              name="description"
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's your board about?"
              value={boardData.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex space-x-2 justify-end">
        <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={()=>handleDelete(folder)}
          >
            Delete
          </button>
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
  
    </div>
  {showBoard&&(<CreateBoard/>)}

    </>
  );
}

export default Saved;
