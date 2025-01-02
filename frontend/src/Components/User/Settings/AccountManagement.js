import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../Utils/AxioaInstance';
import { Link, useNavigate } from 'react-router-dom';

const AccountManagement = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    try {
      // Make a POST request to the backend to reset the password
      const response = await axiosInstance.put('/change-password', {
        oldPassword,
        newPassword,
      });

      // Success handling
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      navigate("/profilepage")
    } catch (error) {
      // Error handling
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Change your password</h2>

      <form onSubmit={handlePasswordReset}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="old-password">
            Old password <Link className="text-blue-500 text-sm cursor-pointer"  to="/forgot-password" >· Forgotten it?</Link>
          </label>
          <div className="relative">
            <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
              placeholder="Enter your old password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="new-password">
            New password
          </label>
          <div className="relative">
            <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="confirm-password">
            Type it again
          </label>
          <div className="relative">
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
              placeholder="Re-enter your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            // onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={()=>navigate("/profilepage")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Change password
          </button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
       
      </form>
    </div>
  </div>
  );
};

export default AccountManagement;
