// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css' 
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import ShareMenu from '../Common/ShareMenu';
import BoardPopup from '../Common/BoardPopup';
import {addSavedFolder,removeSavedFolder,setSavedFolders} from '../Redux/SavedSlice'
import { setBoards } from '../Redux/BoardSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import ReportPost from '../Common/ReportPost';
import { useClickHandler } from '../Context/ClickHandlerContext';

const Home = () => {
  const posts  = useSelector((state) => state.post.post);
  const saved = useSelector((state) => state.save.save);
  const boards = useSelector((state) => state.board.boards);

  const [isShareMenuVisible, setShareMenuVisible] = useState(false); //visibiliby of ShareMenu 
  const [isBoardMenuVisible, setBoardMenuVisible] = useState(""); //visibiliby of BoardMenu
  const [open,setOpen]=useState(false) 
  const {showBoard,setShowBoard} = useClickHandler()
  
  
  const videoRefs = useRef([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  //fetch the Saved posts
  const fetchData = async () => {
    const response = await axiosInstance.get("/saves");
    dispatch(setSavedFolders(response.data.getsaved?.posts));
  };

  useEffect(() => {
    const fetchDataWrapper = handleAsync(fetchData);
    fetchDataWrapper();
  }, [dispatch]);

  // fetch the boards
  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const respond = await axiosInstance.get('/viewboards');
      dispatch(setBoards(respond.data.boards || [])); 
    });
    fetchData();
  }, [dispatch]);

  const handleShareClick = (id) => {
    setShareMenuVisible(id); 
  };

  const handleBoardClick = (id) => {
    setBoardMenuVisible(id); 
  };

  const handle = (post) => {
    setShowBoard((prev) => !prev);
    setOpen((prev) => !prev); // Toggle visibility
  };
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

  // save and remove the posts
  const handleToggleSave = handleAsync(async (id) => {
    const isAlreadySaved = saved?.some((item) => item._id === id);
    if (isAlreadySaved) {
      const response = await axiosInstance.delete(`/removesaved`, {
        data: { postId: id },
      });
      const removedData = response.data.data;
      console.log("Removed:", removedData);
      handleAsync(fetchData)();
      dispatch(removeSavedFolder(removedData));
    } else {
      const response = await axiosInstance.post(`/addtosave`, { postId: id });
      const savedData = response.data.saved;
      console.log("Saved:", savedData);
      handleAsync(fetchData)();
      dispatch(addSavedFolder(savedData));
    }
  });

  return (
    <>
    <div className="container overflow-hidden">
      {posts?.map((post, index) => (
        <div className="relative group box" key={post?._id}>
          {/* Conditional rendering for video or image */}
          {post?.image.endsWith(".mp4") ||
          post.image.endsWith(".mov") ||
          post?.image.endsWith(".avi") ? (
            <video
              onClick={() => navigate(`/viewpost/${post._id}`)}
              src={post?.image}
              ref={(el) => (videoRefs.current[index] = el)}
              alt={post.title}
              className="w-full h-auto object-cover rounded-2xl"
              onMouseEnter={() => handleMouseEnter(videoRefs.current[index])}
              onMouseLeave={() => handleMouseLeave(videoRefs.current[index])}
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          )}
  
          {/* Hover Content */}
          <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center relative w-full h-full">
              {/* Conditional content rendering */}
              {boards?.some((board) =>
                board.posts?.some((p) => p._id === post?._id)
              ) ? (
                <div
                  className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-3 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                 <button className="text-base font-semibold text-white flex items-center space-x-2"
                  onClick={() =>
                    navigate(
                      `/viewboard/${boards.find((board) =>
                        board.posts?.some((p) => p._id === post?._id)
                      )?._id}`
                    )
                  }
                >
                  {boards.find((board) =>
                    board.posts?.some((p) => p._id === post?._id)
                  )?.name}
                </button>
                </div>
              ) : saved?.some((item) => item._id === post?._id) ? (
                <div
                  className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-3 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  
                >
                 <button className="text-base font-semibold text-white flex items-center space-x-2"
                  onClick={() => navigate('/pin')}
                >
                  Profile
                </button>
                </div>
              ) : (
                <div
                  className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleBoardClick(post?._id)}
                >
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
                  {isBoardMenuVisible === post._id && (
                    <BoardPopup
                      postid={post._id}
                      isBoardMenuVisible={isBoardMenuVisible}
                      setBoardMenuVisible={setBoardMenuVisible}
                    />
                  )}
                </div>
              )}
              
              {/* Navigate to Post View */}
              <div
                className="mt-[60px] h-[240px]"
                onClick={() => navigate(`/viewpost/${post._id}/${post.category.name}`)}
              ></div>
  
              {/* Save Button */}
              <button
                className={`absolute top-2 right-2 ${
                  saved?.some((item) => item._id === post?._id)
                    ? 'bg-black'
                    : 'bg-red-600 hover:bg-red-700'
                } text-white px-4 py-3 rounded-full shadow`}
                onClick={() => handleToggleSave(post?._id)}
              >
                {saved?.some((item) => item._id === post?._id) ? 'Saved' : 'Save'}
              </button>
  
              {/* Share Menu */}
              <button
                className="absolute bottom-2 text-black right-12 bg-gray-100 rounded-full p-2 hover:bg-gray-200"
                onClick={() => handleShareClick(post._id)}
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
  
              {/* More Options */}
              <button className="absolute bottom-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-300"
              onClick={()=>setOpen(!open)}>
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
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              {showBoard&&(<ReportPost id={post._id}/>)}
              {/* Share Menu Popup */}
              {isShareMenuVisible === post._id && (
                <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
                  <div className="absolute top-1 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
                    <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible} />
                  </div>
                </OutsideClickHandler>
              )}
              {open && (
        <div className="absolute right-0 bottom-[30px] w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
          <p className="px-4 py-2 text-sm text-gray-500">
            create
          </p>
          <div className="border-t border-gray-200">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handle}
            >
              Report Pin
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={handleboard}
            >
              Board
            </button>
            
          </div>
        </div>
      )}
            </div>
          </div>
        </div>
      ))}
    </div>
  
  </>
  
  );
};

export default Home;
