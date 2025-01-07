import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import { toast } from "react-toastify";

function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("admin/viewusers");
        const nonAdminUsers = response.data.users;
        setData(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleBlock = handleAsync(async (id) => {
    const response = await axiosInstance.post(`/admin/updateuser/${id}`);
    const updatedUser = response.data.user;
    console.log(updatedUser)
    setData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id ? { ...user, isBlocked: updatedUser.isBlocked } : user
      )
    );
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
  });

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  if (!data.length) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen px-4 py-3 lg:ml-60 sm:px-6 sm:ml-0 lg:px-8">
  <button
    onClick={() => navigate("/admin")}
    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
  >
    Go Back
  </button>
  <div className="overflow-x-auto">
  <div className="overflow-x-auto">
  <table className="table-auto w-full text-left border-collapse bg-white shadow-lg rounded-lg">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold">ID</th>
        <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold">Name</th>
        <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold">Email</th>
        <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-center" colSpan={2}>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((user) => (
        <tr
          key={user._id}
          className="hover:bg-gray-100 text-gray-700 border-b border-gray-300"
        >
          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{user._id}</td>
          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{user.username}</td>
          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{user.email}</td>
          <td className="px-4 sm:px-6 py-4 text-center">
            <button
              onClick={() => navigate(`/view/${user._id}`)}
              className="text-xs sm:text-sm bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-400 transition"
            >
              View
            </button>
          </td>
          <td className="px-4 sm:px-6 py-4 text-center">
            <button
              className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md text-white transition ${
                user.isBlocked
                  ? "bg-yellow-500 hover:bg-yellow-400"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => handleBlock(user._id)}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  </div>
</div>

  );
}

export default Users;
