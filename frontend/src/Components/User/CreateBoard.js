import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useClickHandler } from "../Context/ClickHandlerContext";
import axiosInstance from "../Utils/AxioaInstance";
import { useDispatch } from "react-redux";
import { addBoard } from "../Redux/BoardSlice";

const CreateBoard = () => {
  const dispatch = useDispatch();
    const {showBoard,setShowBoard} = useClickHandler()
  
  const { show, setShow } = useClickHandler();

  const [data, setData] = useState({ name: "" });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
      const response = await axiosInstance.post("/createboard", data);
      dispatch(addBoard(response.data.newBoard));
      setShowBoard(false); // Close the modal after successful creation
  };
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <OutsideClickHandler onOutsideClick={()=> setShowBoard(false)}>
        <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Board</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowBoard(false)}
          >
            &times;
          </button>
        </div>

          <form >
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="board-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={data.name}
                name="name"
                onChange={handleChange}
                id="board-name"
                placeholder='E.g. "Places to go" or "Recipes to make"'
                className="mt-1 w-full h-10 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue"
                required
              />
            </div>

            {/* Create Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default CreateBoard;
