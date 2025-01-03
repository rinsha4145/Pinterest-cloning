import React, { useEffect, useRef, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';
import ShareMenu from './ShareMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addSavedFolder,removeSavedFolder,setSavedFolders} from '../Redux/SavedSlice'
import BoardPopup from '../Home/BoardPopup';
import UpdatePost from './UpdatePost';
import OutsideClickHandler from 'react-outside-click-handler';
function ViewOtherUserProfile() {
  const [activeTab, setActiveTab] = useState("Saved");
  const [active, setActive] = useState("");
  const [boards, setBoards] = useState([]);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false); 
  const saved = useSelector((state) => state.save.save);
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [isBoardMenuVisible, setBoardMenuVisible] = useState(false); 
  const [showEdit, setShowEdit] = useState(false); 
  const videoRefs = useRef([]);
  const [isInteracted, setIsInteracted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axiosInstance.get(`/profile/${id}`);
        setData(profileResponse.data.userProfile);

        const postsResponse = await axiosInstance.get(`/getposts/${id}`);
        setPosts(postsResponse.data.posts);

        const boardsResponse = await axiosInstance.get(`/board/${id}`);
        setBoards(boardsResponse.data.boards);
        
        const savedResponse = await axiosInstance.get("/saves");
        dispatch(setSavedFolders(savedResponse.data.getsaved?.posts));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const handleMouseEnter = (videoElement) => {
    if (videoElement) {
      videoElement.muted = false;
      videoElement.play().catch((error) => console.error('Error playing video:', error));
    }
  };

  const handleMouseLeave = (videoElement) => {
    if (videoElement) {
      videoElement.pause();
      videoElement.muted = true;
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await axiosInstance.post(`/addtosave`, { postId: id });
      const savedData = response.data.saved;
      dispatch(addSavedFolder(savedData));
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const removesave = async (postid) => {
    try {
      const response = await axiosInstance.delete(`/removesaved`, { data: { postId: postid } });
      dispatch(removeSavedFolder(response.data.data));
    } catch (error) {
      console.error('Error removing saved post:', error);
    }
  };

  const handleUserInteraction = () => {
    setIsInteracted(true);
  };

  const handleShareClick = () => {
    setShareMenuVisible((prev) => !prev);
  };

  const handleBoardClick = (post) => {
    setBoardMenuVisible((prev) => !prev);
  };
  return (
    <>
     <div className=" min-h-screen flex flex-col items-center">
     <div className="w-full max-w-4xl text-center mt-10 px-4 sm:px-6">
     <div className="flex justify-center">
       {data?.profileimage ? (
               <img
                 src={data?.profileimage}
                 alt="User Profile"
                 className="w-32 h-32 rounded-full object-cover"
               />
             ) : (
               <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center pb-3 justify-center text-black text-lg">
                 {data?.username ? data?.username[0].toUpperCase() : ''}
               </div>
             )}
    </div>
    <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">{data?.firstname}</h1>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">{data?.about}</p>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">@{data?.username}</p>
    <p className="mt-2 text-sm sm:text-base text-black-600">
  {data?.followers ? `${data?.followers.length} followers` : '0 followers'} · {data?.following ? `${data?.following.length} following` : '0 following'}
</p>


   
    <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* <button className={`px-4 sm:px-6 py-2 border border-gray-300 rounded-full ${
              active === "Share"
                ? "bg-black text-white"
                :"bg-gray-200   hover:bg-gray-100 transition duration-300"}`}
                onClick={() => setActive("Share") }>
            Share
          </button> */}
          <button className={`px-4 sm:px-6 py-2 border border-gray-300 rounded-full ${
              active === "Share"
                ? "bg-black text-white"
                :"bg-gray-200   hover:bg-gray-100 transition duration-300"}`}
                onClick={() =>{setShareMenuVisible((prev) => !prev); setActive("Share")} }>
            Share
          </button>
          {isShareMenuVisible && (
            <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
            <div className="absolute bottom-12 mr-[200px] top-[400px] bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
                <ShareMenu url={`http://localhost:3000/userpage/${data._id}`} isShareMenuVisible={isShareMenuVisible}/>
                
                </div> 
                </OutsideClickHandler>
                
              )}
             
          <button   className="px-3 sm:px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
            Follow
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
        {activeTab==="Saved"?(
        <>
        { boards ?(
      <>
    <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
     
      {/* Dynamic Folders */}
      {boards.map((folder) => (
        <div
          key={folder._id}
          onClick={() => navigate(`/viewboard/${folder._id}`)}
          className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
        >
          {/* Image Previews */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2">
  {Array.isArray(folder.posts) &&
    folder.posts.slice(-3).map((img, index) => {
      if (!img || !img.image) return null; // Skip rendering if img or img.image is missing
      return (
        <div className="relative w-full pt-[75%] bg-gray-400 overflow-hidden rounded-lg" key={index}>
          <img
            src={img.image}
            alt={`Preview ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
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
  

    </>
    )}
        </>
        ):(
          <>
         
<div className="container overflow-hidden" onClick={handleUserInteraction} >
{posts?.map((post,index) => (
  <div
    className="relative group box" 
    key={post?._id}
    
  >
    {post?.image.endsWith(".mp4") || post.image.endsWith(".mov") || post?.image.endsWith(".avi") ? (
  <video
  onClick={()=>navigate(`/viewpost/${post._id}`)}    
  src={post?.image}
  ref={(el) => (videoRefs.current[index] = el)} // Set ref for each video dynamically
  alt={post.title}
  className="w-full h-auto object-cover rounded-2xl "
  onMouseEnter={() => handleMouseEnter(videoRefs.current[index])} // Play video on hover
  onMouseLeave={() => handleMouseLeave(videoRefs.current[index])} // Pause and reset video on mouse leave
  muted={true} // Initially muted to comply with autoplay policy
  loop={true} // Optional: Loop the video if desired
  playsInline // Ensure video plays inline on mobile
/>
) : (
  <img
 
    src={post.image}
    alt={post.title}
    className="w-full h-auto object-cover "
  />
)}

    {/* Hover Content */}
    <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"  >
<div className="text-center relative w-full h-full">
  {saved?.some(item => item._id === post?._id) ? (
    <>
    <p className="absolute top-2 left-2  text-center">qadwsa</p>
    </>

  ):(
    <>
  <div className='absolute top-2 left-2 hover:bg-black bg-transparent border-white  rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300'  onClick={() => handleBoardClick(post)}>

<button className="text-base font-semibold text-white  flex items-center space-x-2">
    Quick saves
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </button>
  </div>
  </>
  
  )} 
  

  {saved?.some(item => item._id === post?._id) ? (
<button
  className="absolute top-2 right-2 bg-black text-white px-4 py-3 rounded-full shadow"
  onClick={() => removesave(post?._id)}
>
  Saved
</button>
) : (
<button
  className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
  onClick={() => handleSave(post?._id)}
>
  Save
</button>
)} 
{isBoardMenuVisible && (
              <BoardPopup postid={post._id} isBoardMenuVisible={isBoardMenuVisible} setBoardMenuVisible={setBoardMenuVisible}/>
            )} 


  <div className='mt-[60px]  h-[240px]' onClick={()=>navigate(`/viewpost/${post._id}/${post.category.name}`)}></div>
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
              <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible}/>
            )}
  <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" onClick={()=>setShowEdit(true)}>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
         </svg>
         
</button>
{showEdit && (
              <UpdatePost />
            )}
</div>
</div>
  </div>
))}
</div>
      </>
  
        )}
</div>
    </>
  )
}

export default ViewOtherUserProfile