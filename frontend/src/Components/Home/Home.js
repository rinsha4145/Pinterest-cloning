// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/PostSlice';
import './Home.css'
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import ShareMenu from '../User/ShareMenu';
const Home = () => {
  const [isShareMenuVisible, setShareMenuVisible] = useState(false); // State to control visibility of ShareMenu
  const videoRefs = useRef([]);
  const [isInteracted, setIsInteracted] = useState(false);
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
//post fetching
useEffect(() => {
  const fetchData = handleAsync(async () => {
      const response = await axiosInstance.get('/all');
      dispatch(setPosts(response.data)); 
  });
  fetchData();
}, []);


const handleMouseEnter = (videoElement) => {
  if (videoElement) {
    videoElement.muted = false; // Unmute when hovered
    videoElement.play().catch((error) => {
      console.error('Error playing video:', error);
    });
  }
};

// Handle mouse leave to pause and mute video
const handleMouseLeave = (videoElement) => {
  if (videoElement) {
    videoElement.pause();
    videoElement.muted = true; // Re-mute after pause
  }
};

// Function to simulate a user interaction to allow autoplay
const handleUserInteraction = () => {
  setIsInteracted(true); // Simulate user interaction
};
const handleShareClick = (post) => {
  
    setShareMenuVisible((prev) => !prev); // Toggle visibility
  };
  return (
    <>
    <div className="container overflow-hidden" onClick={handleUserInteraction}>
  {posts.map((post,index) => (
    <div
      className="relative group box" 
      key={post._id}
    >
      {post.image.endsWith(".mp4") || post.image.endsWith(".mov") || post.image.endsWith(".avi") ? (
    <video
    src={post.image}
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
                <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible}/>
              )}
    <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>


</button>

  </div>
</div>
    </div>
  ))}
</div>

    </>
  );
};

export default Home;
