import React, { useState } from "react";
import axiosInstance from "../../Utils/AxioaInstance";
import { useSelector } from "react-redux";

const DeleteAccount = () => {
  const { user } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleSubmit = async () => {
      setIsLoading(true); // Start loading
      setMessage(""); // Reset message
      try {
        const response = await axiosInstance.post('/request-deletion');
        if (response.status === 200) {
          setMessage("An email has been sent with the final step to delete your account.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } catch (error) {
        setMessage("Failed to process your request. Please try again later.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Delete your account
      </h1>
      <p className="text-sm md:text-base text-gray-600 text-center max-w-md mb-8">
        Deleting your account means you won't be able to get your Pins or boards back. All of your Pinterest account data will be deleted.
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <img
              src={user.profileimage}
              alt="User image"
              className="rounded-full"
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{user.username}</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          {user.username}, if you're ready to leave forever, we'll send an email with
          the final step to:
        </p>
        <p className="text-sm md:text-base font-medium text-gray-800 mb-6">
          {user.email}
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
