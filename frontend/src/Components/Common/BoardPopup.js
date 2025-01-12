import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import CreateBoard from "../User/CreateBoard";
import { addSavedFolder, setSavedFolders } from "../Redux/SavedSlice";
import { setBoards, addPostToBoard } from "../Redux/BoardSlice";
import { useClickHandler } from "../Context/ClickHandlerContext";
import OutsideClickHandler from "react-outside-click-handler";

const Popup = ({ postid, isBoardMenuVisible }) => {
  const boards = useSelector((state) => state.board.boards);

  const [show, setShow] = useState(isBoardMenuVisible);
  const { setIsOpen, isOpen } = useClickHandler();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = boards.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dispatch = useDispatch();

  const handleSave = handleAsync(async () => {
    const response = await axiosInstance.post(`/addtosave`, { postId: postid });
    const savedData = response.data.saved;
    console.log(savedData);
    handleAsync(fetchData)();
    setShow(false);
    dispatch(addSavedFolder(savedData));
  });


  const savetoboard = handleAsync(async (id) => {
    const response = await axiosInstance.post(`/addtoboarad`, {
      boardId: id,
      postId: postid,
    });
    const savedData = response.data.saved;
    handleAsync(fetchData)();
    setShow(false);
    dispatch(addPostToBoard(savedData));
  });


  const fetchData = async () => {
    const response = await axiosInstance.get("/saves");
    dispatch(setSavedFolders(response.data.getsaved?.posts));
  };


  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const respond = await axiosInstance.get("/viewboards");
      dispatch(setBoards(respond.data.boards || [])); // Ensure boards fallback to an empty array
    });
    fetchData();
  }, [dispatch]);


  const handleboard = () => {
    setIsOpen(true);
    setShow(false);
  };

  return (
    <div className="relative text-black ">
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
        {/* Popup Modal */}
        {show && (
          <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md w-[300px] z-10">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Save</h2>
              <input
                type="text"
                value={searchQuery}
                placeholder="Search boards"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery.trim() && (
                <ul>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <div
                        className="flex items-center mt-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => savetoboard(item._id)}
                      >
                        <div className="bg-gray-200 w-8 h-8 rounded-md"></div>
                        <p className="ml-2 text-sm">{item.name}</p>
                      </div>
                    ))
                  ) : (
                    <li className="p-2">No results found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Quick save section */}
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-600">
                Quick save and organize later
              </p>
              <div
                onClick={() => handleSave()}
                className="flex items-center mt-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              >
                <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="ml-2 text-sm">Profile</p>
              </div>
            </div>

            {/* Save to board section */}
            <p className="text-sm font-semibold text-gray-600">Save to board</p>

            <div className="p-4  relative h-[200px] overflow-y-auto">
              {boards?.map((board) => (
                <div
                  className="flex items-center mt-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                  onClick={() => savetoboard(board._id)}
                >
                  <div className="bg-gray-200 w-8 h-8 rounded-md"></div>
                  <p className="ml-2 text-sm">{board.name}</p>
                </div>
              ))}
            </div>

            {/* Suggestions section */}
            <div className="p-4">
              {/* <p className="text-sm font-semibold text-gray-600">Suggestions</p>
            <div className="flex items-center mt-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                <span>+</span> 
              </div>
              <p className="ml-2 text-sm">Travel aesthetic</p>
            </div> */}
              <div className="flex items-center mt-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
                <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                  <span>+</span>
                </div>
                <button className="ml-2 text-sm" onClick={handleboard}>
                  Create board
                </button>
              </div>
            </div>
          </div>
        )}
      </OutsideClickHandler>
      {isOpen ? <CreateBoard /> : ""}
    </div>
  );
};

export default Popup;
