import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../Utils/AxioaInstance';
import handleAsync from '../../Utils/HandleAsync';
import {  updateUser } from '../../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const [userdata, setUserData] = useState({
    profileimage: '',
    firstname: '',
    lastname: '',
    about: '',
    website: '',
    username: '',
  });
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const [originalData, setOriginalData] = useState(user);
   
  useEffect(() => {
    const fetchData = handleAsync(async () => {
      const response = await axiosInstance.get('/me');
      setUserData(response.data.profile);
      
      
    });
    fetchData();
    
  }, []);
  const isFormChanged = JSON.stringify(userdata) !== JSON.stringify(user);
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const file = files?.[0];
    if (name === 'profileimage' && file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  const handleReset = () => {
      setUserData(originalData);

  };
 
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = async () => {
      const formData = new FormData();
      Object.keys(userdata).forEach((key) => {
        const value = userdata[key];
        const originalValue = user[key];
        if (value !== originalValue && !["followers", "following", "updatedAt","__v"].includes(key)) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      });

      try {
        const response = await axiosInstance.put("/editprofile", formData);
        if (response.status >= 200 && response.status < 300) {
          dispatch(updateUser(response.data.updatedProfile));
          console.log(response.data.updatedProfile)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.');
      }
    };

    update();
  };
  return (
    <div><div className="flex-1 p-8">
    <h2 className="text-3xl font-semibold mb-4">Edit Profile</h2>
    <p className="text-gray-600 mb-6">
      Keep your personal details private. Information you add here is visible to anyone who can view your profile.
    </p>

    {/* Profile Image */}
    <div className="flex items-center mb-6">
      <img
        src={preview||userdata.profileimage}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border"
      />
      <button
        className="ml-4 px-4 py-2 bg-gray-200  rounded-full hover:bg-gray-300"
        onClick={() => setShowModal(true)}
      >
        Change
      </button>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h3 className="text-lg font-semibold text-center mb-4">Change your picture</h3>
          <input
            type="file"
            name="profileimage"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowModal(false)}
          >
            Upload
          </button>
          <button
            className="mt-2 w-full text-center text-gray-600 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstname"
            value={userdata.firstname || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={userdata.lastname || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 mb-2">About</label>
        <textarea
          name="about"
          rows="3"
          value={userdata.about || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 mb-2">Website</label>
        <input
          type="text"
          name="website"
          value={userdata.website || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={userdata.username || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 space-x-4">
        <button
          onClick={handleReset}
          type="button"
          disabled={!isFormChanged} // Disable if no changes
          className={`px-6 py-2 rounded-full ${
            isFormChanged
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={!isFormChanged} // Disable if no changes
          className={`px-6 py-2 rounded-full ${
            isFormChanged
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </form>
  </div></div>
  )
}

export default EditProfile