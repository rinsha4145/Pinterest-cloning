import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import { useParams } from 'react-router-dom';
import { updateBoard } from '../Redux/BoardSlice';
import { useDispatch } from 'react-redux';


function ViewBoard() {
    const {id}=useParams()
    const [data, setData] = useState(null);   // State to store fetched data
    const dispatch = useDispatch();

        const fetchData = async () => {
            const response = await axiosInstance.get(`/viewbyid/${id}`);
            setData(response.data.board);
            console.log(response.data.board)
        };
      
    useEffect(() => {
      const fetchDataWrapper = handleAsync(fetchData);
      fetchDataWrapper();
    }, [dispatch]);
    
    const handleDelete = async(postid) => {
      const response = await axiosInstance.delete(`/removepost` ,{
        data: { boardId: id, postId: postid }, // Use 'data' for the request payload
      });
      dispatch(updateBoard(response.data.board));
      handleAsync(fetchData)()
      console.log(response.data.board)
    };
      
  return (
   <>
    <div className="p-6 max-w-screen-lg mx-auto">
      {/* Title and Subtitle */}
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{data?.name}</h1>
          <p className="text-gray-500 mt-2 md:mt-0">{data?.description}</p>
          <p className="text-gray-500 mt-2 md:mt-0">{data?.posts.length} pins</p>
        </div>

        
      </div>

      {/* Action Buttons */}
      {/* <div className="flex space-x-4 mt-6">
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">More ideas</span>
        </button>
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">Organise</span>
        </button>
      </div> */}
    </div>
 
    <div className="container">
   
    {data?.posts?.map((post) => (
  <div className="relative group box" key={post._id}>
    {/* Image with hover container */}
    <div className="relative">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto object-cover rounded-2xl"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-center relative w-full h-full">
          {/* Quick Saves Button */}
          <div className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <button className="text-base font-semibold text-white flex items-center space-x-2">
              Quick saves
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {/* Save Button */}
          <button className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700">
            Save
          </button>
          {/* Delete Icon */}
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
    {/* Title and Icon */}
    <div className="flex mt-2">
      <p>{post.title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </div>
  </div>
))}

     
</div>
   
   </>  

  )
}

export default ViewBoard