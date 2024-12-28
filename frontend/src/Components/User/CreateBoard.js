import React from "react";

const CreateBoard = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Create board</h2>
        <form>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="board-name"
              placeholder='E.g. "Places to go" or "Recipes to make"'
              className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Secret Board Toggle */}
          <div className="mb-4 flex items-start">
            <input
              type="checkbox"
              id="secret-board"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="secret-board"
              className="ml-2 text-sm text-gray-600"
            >
              Keep this board secret
              <p className="text-gray-400 text-xs">
                So only you and collaborators can see it. Learn more
              </p>
            </label>
          </div>

          {/* Add Collaborators */}
          <div className="mb-4">
            <label
              htmlFor="add-collaborators"
              className="block text-sm font-medium text-gray-700"
            >
              Add collaborators
            </label>
            <input
              type="text"
              id="add-collaborators"
              placeholder="Search by name or email address"
              className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Collaborator Item */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">Nervana Moustafa</p>
                <p className="text-sm text-gray-500">@nervanamoustafa</p>
              </div>
            </div>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Add
            </button>
          </div>

          {/* Create Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoard;
