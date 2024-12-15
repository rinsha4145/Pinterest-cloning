import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../Utils/AxioaInstance';


function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
               
            }
        }).catch(err => console.log(err))
    }

    return(
      <>
      <div className="flex justify-center items-center bg-gray-200 h-screen">
        <div className="bg-white p-6 rounded-md w-80">
          <h4 className="text-lg font-semibold mb-4">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
    )
}

export default ForgotPassword;