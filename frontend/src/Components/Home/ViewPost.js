import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Category from "./Category";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import {updateLikedBy,updateComments} from '../Redux/PostSlice'
import ShareMenu from "../User/ShareMenu";
import EmojiPicker from "emoji-picker-react";
import OutsideClickHandler from "react-outside-click-handler";


const ViewPost = () => {
  const {_id}=useParams()
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

     // State to store fetched data
  const posts = useSelector((state) => state.post.post);
  const  user  = useSelector((state) => state.user.user);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const navigate=useNavigate()
  const [comment, setComment] = useState("");
  const [showPicker, setShowPicker] = useState(false); // State to toggle emoji picker

   // State to control visibility of ShareMenu
  const fetchPin =handleAsync( async () => {
    const response = await axiosInstance.get(`/post/${_id}`);
    setData(response.data.onepost);
    
});
  useEffect(() => {
    const fetchDataWrapper = handleAsync(fetchPin);
  fetchDataWrapper(); 
}, [_id]);
const dispatch = useDispatch()



useEffect(() => {
  const fetchData = async () => {
    const response = await axiosInstance.get("/viewlike");
    dispatch(updateLikedBy(response.data.likedPosts));
  };
}, [dispatch]);
// const filteredPosts = posts.filter(post => post.category?.name === data?.category?.name);

const handleShareClick = (post) => {
  setShareMenuVisible((prev) => !prev); 
};

const handleOpen = () => {
  setOpen((prev) => !prev); 
};
const handleLikeToggle = handleAsync(async (postId,userid) => {
  
    const isPostLiked = data?.likedBy.some(item => item === userid);
    if (isPostLiked===false) {
      const response = await axiosInstance.post(`/like`, { postId });
      const savedData = response.data.post;
      dispatch(updateLikedBy(savedData));
      handleAsync(fetchPin)();
    } else {
      const response = await axiosInstance.delete(`/unlike`, {
        data: { postId },
      });
      const Data = response.data.post;
      dispatch(updateLikedBy(Data));
      handleAsync(fetchPin)();
    }
});
const handleToggle= (e)=>{
  e.preventDefault()
  setShow((prev) => !prev);
}

const addComment=async(id, comment)=> {
  const response = await axiosInstance.post(`/comment/${id}`, { comment });
  console.log("Updated pin:", response.data.pin);
  dispatch(updateComments(response.data.pin)) // Log updated pin data
  fetchPin(id);
  setComment("");
  setShowPicker(false)
}
const handleEmojiClick = (emojiObject) => {
  setComment((prevComment) => prevComment + emojiObject.emoji); // Append emoji to the comment
};
// const deleteComment=async(id, commentId)=> {
//     const { data } = await axiosInstance.delete( `/api/pin/comment/${id}?commentId=${commentId}`);
//     alert(data.message);
//     fetchPin(id);
  
// }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-screen-lg h-[600px] w-[1500px] mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Content Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Image Section */}
          
          <div className="w-full md:w-1/2">
            <img
              src={data?.image} 
              alt="Pin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Details Section */}
          <div className="w-full md:w-1/2 p-6">
            {/* Icons Section */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
              <div className={`flex space-x-2 right-[430px] cursor-pointer ${data?.likedBy.some(item => item=== user._id) ? 'text-red-500' : 'text-black-400'}`}
  
>
<div onClick={() => data && handleLikeToggle(data?._id,user?._id)}>
{data?.likedBy.some(item => item === user._id) ? (
  <FaHeart className="w-5 h-5 text-red-500 top-[150px]" />
) : (
  <FaRegHeart className="w-5 h-5 text-black-400 top-[150px]" />
)}

   </div>
  
{data?.likedBy.length > 0 && (
    <span className="text-black ">{data?.likedBy.length}</span>
  )}
 

<button
    className="p-2 top-[130px] bottom-2 right-12 rounded-full hover:bg-gray-200 text-black"
    onClick={() => handleShareClick(data)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  </button>
  <div className="absolute">
  {isShareMenuVisible && (
                <ShareMenu url={data.image} isShareMenuVisible={isShareMenuVisible}/>
              )}</div>
                
</div>


              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Save
              </button>
            </div>

            {/* Details Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
              <p className="text-gray-500 text-sm">{data?.description}</p>
            </div>

          {/* User Info Section */}
            <div className="flex items-center mt-6" onClick={()=>navigate(`/userpage/${data.owner._id}`)}>
            {data?.owner?.profileimage ? (
            <img src={data?.owner?.profileimage} alt="Profile"  className="h-10" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              <div className="ml-4">
                <h3 className="font-bold">{data?.owner?.firstname}</h3>
                <p className="text-gray-500">{data?.owner?.followers?.length || 0} followers</p>

              </div>
              <button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-100">
                Follow
              </button>
            </div>

            {/* Comments Section */}
            <div className="p-4 md:p-6 lg:p-8 bg-white">
  <div className="mb-4">
    <button
      className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none"
      onClick={handleToggle}
    >
      {data?.comments?.length} comments
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  </div>

  {show && (
    <>
    {data?.comments?.length===0 ?(
      <>
      <h4 className="font-bold">No comments yet</h4>
      <p className="text-gray-500 mt-2">Add one to start the conversation.</p>
      </>
    ):(
        <>
  <div className="relative h-[200px] overflow-y-auto">
    {/* Comments Section with scrolling */}
    {data?.comments?.slice().reverse().map((comment) => (
      <div
        key={comment._id}
        className="p-4 flex items-start space-x-4 "
      >
        {/* First Column: Image */}
        <div className="flex-shrink-0">
          {comment?.user?.profileimage ? (
            <img
              src={comment?.user?.profileimage}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </div>

        {/* Second Column: Text and SVG */}
        <div className="flex-grow">
          {/* First Row: Name and Comment */}
          <div className="text-sm">
            <span
              className="font-semibold hover:underline cursor-pointer"
              onClick={() => navigate(`/userpage/${data.owner._id}`)}
            >
              {comment?.user?.username}
            </span>{" "}
            {comment.comment}
          </div>
          

          {/* Second Row: SVG Button */}
          <div className=" flex" onclick={handleOpen}>
            <button className="bg-white hover:bg-gray-300 rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  </>
      )}
  </>
)}

{open && (
        <div className="absolute w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
          <div className="border-t border-gray-200">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={()=>navigate("/create")}
            >
              edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={handleboard}
            >
              delete
            </button>
            
          </div>
        </div>
      )}

  {/* Comment Input Section */}
  <div className="mt-4 z-50">
    <div className="relative flex border rounded-lg px-4 py-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        className="w-full border-none focus:outline-none"
      />
      <button
          type="button"
          className="p-2  rounded-full"
          onClick={() => setShowPicker((prev) => !prev)}
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
</svg>

        </button>
        
      {comment.trim() && (
        <button
          className="bg-red-500 p-1 ml-1 rounded-full"
          onClick={() => addComment(data?._id, comment)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      )}
    </div>
  </div>
</div>
    <OutsideClickHandler onOutsideClick={() => setShowPicker(false)}>

{showPicker && (
        <div className="absolute z-50 bg-white border rounded-md shadow-md">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      </OutsideClickHandler>

          </div>
          
        </div>
        
      </div>
     
  
      {/* More to Explore Section */}
      <div className="mt-8">
        <h3 className="flex justify-center text-lg font-bold mb-4">More to explore</h3>
      <Category category={data?.category?.name}/>
      </div>
    </div>
  );
};

export default ViewPost;
