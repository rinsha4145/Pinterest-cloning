import React, { useState } from "react";
import { useClickHandler } from "../Context/ClickHandlerContext";
import axiosInstance from "../Utils/AxioaInstance";
import { useDispatch } from "react-redux";
import { addReportToPost } from "../Redux/PostSlice";
import handleAsync from "../Utils/HandleAsync";

const ReportPost = ({ id }) => {
  const dispatch = useDispatch();
  const { showBoard, setShowBoard } = useClickHandler();

  const [reason, setReason] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page


      const response = await axiosInstance.post(`/report/${id}`, { reason });

      const report = response.data.report;
     console.log(report)
      setShowBoard(false);

      setReason("");
      dispatch(addReportToPost(report));

    
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Report Post</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowBoard(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              value={reason}
              name="reason"
              onChange={handleChange}
              id="reason"
              placeholder="E.g. 'Inappropriate content' or 'Spam'"
              className="mt-1 w-full h-10 text-black rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPost;
