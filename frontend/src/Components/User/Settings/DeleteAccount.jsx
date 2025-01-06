import React from "react";

const DeleteAccount = () => {
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
              src="https://via.placeholder.com/64"
              alt="User avatar"
              className="rounded-full"
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Rinujouhar</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Rinujouhar, if you're ready to leave forever, we'll send an email with
          the final step to:
        </p>
        <p className="text-sm md:text-base font-medium text-gray-800 mb-6">
          rinujouhar@gmail.com
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
