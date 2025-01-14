import React, { useEffect, useRef, useState } from "react";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import ShareMenu from "../Common/ShareMenu";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../Redux/BoardSlice";
import {
  addSavedFolder,
  removeSavedFolder,
  setSavedFolders,
} from "../Redux/SavedSlice";
import BoardPopup from "../Common/BoardPopup";
import UpdatePost from "./UpdatePost";
import OutsideClickHandler from "react-outside-click-handler";

function Created() {
  const saved = useSelector((state) => state.save.save);

  const [data, setData] = useState([]);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false); //  control visibility of ShareMenu
  const [isBoardMenuVisible, setBoardMenuVisible] = useState(false); //  control visibility of board
  const [showEdit, setShowEdit] = useState(false); //  control visibility of edit

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const response = await axiosInstance.get("/postss");
      setData(response.data.posts);
    });
    fetchData();
  }, [data.title]);


  const videoRefs = useRef([]);

 
  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const respond = await axiosInstance.get("/viewboards");
      dispatch(setBoards(respond.data.boards || [])); // Ensure boards fallback to an empty array
    });
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    const response = await axiosInstance.get("/saves");
    dispatch(setSavedFolders(response.data.getsaved?.posts));
  };
  // Call fetchData inside useEffect
  useEffect(() => {
    const fetchDataWrapper = handleAsync(fetchData);
    fetchDataWrapper();
  }, [dispatch]);


  const handleMouseEnter = (videoElement) => {
    if (videoElement) {
      videoElement.muted = false; // Unmute when hovered
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
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

  const handleSave = handleAsync(async (id) => {
    const response = await axiosInstance.post(`/addtosave`, { postId: id });
    const savedData = response.data.saved;
    console.log(savedData);
    handleAsync(fetchData)();
    dispatch(addSavedFolder(savedData));
  });

  const removesave = handleAsync(async (postid) => {
    const response = await axiosInstance.delete(`/removesaved`, {
      data: { postId: postid },
    });
    handleAsync(fetchData)();
    dispatch(removeSavedFolder(response.data.data));
  });

  return (
    <div className="container overflow-hidden" >
      {data?.map((post, index) => (
        <div className="relative group box" key={post?._id}>
          {post?.image.endsWith(".mp4") ||
          post.image.endsWith(".mov") ||
          post?.image.endsWith(".avi") ? (
            <video
              onClick={() => navigate(`/viewpost/${post._id}`)}
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
          <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center relative w-full h-full">
              {saved?.some((item) => item._id === post?._id) ? (
                <>
                  <p className="absolute top-2 left-2  text-center">qadwsa</p>
                </>
              ) : (
                <>
                  <div
                    className="absolute top-2 left-2 hover:bg-black bg-transparent border-white  rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    onClick={() => setBoardMenuVisible((prev) => !prev)}
                  >
                    <button className="text-base font-semibold text-white  flex items-center space-x-2">
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
                </>
              )}

              {saved?.some((item) => item._id === post?._id) ? (
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
                <BoardPopup
                  postid={post._id}
                  isBoardMenuVisible={isBoardMenuVisible}
                  setBoardMenuVisible={setBoardMenuVisible}
                />
              )}

              <div
                className="mt-[60px]  h-[240px]"
                onClick={() =>
                  navigate(`/viewpost/${post._id}/${post.category.name}`)
                }
              ></div>
              <button
                className=" absolute p-2 bottom-2 right-12 bg-gray-100 rounded-full hover:bg-gray-200 text-black"
                onClick={() => setShareMenuVisible((prev) => !prev)}
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
                <OutsideClickHandler
                  onOutsideClick={() => setShareMenuVisible(false)}
                >
                  <div className="absolute top-[220px] bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
                    <ShareMenu
                      url={post.image}
                      isShareMenuVisible={isShareMenuVisible}
                    />
                  </div>
                </OutsideClickHandler>
              )}
              <button
                className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onClick={() => setShowEdit(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </button>

              {showEdit && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <OutsideClickHandler
                    onOutsideClick={() => setShowEdit(false)}
                  >
                    <UpdatePost
                      id={post._id}
                      showEdit={showEdit}
                      setShowEdit={setShowEdit}
                    />
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Created;
