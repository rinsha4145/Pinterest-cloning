import React from 'react'

function AccountManagement() {
  return (
    <div className="flex-1 w-1/2  ">
  {/* Header */}
  <div>
    <h1 className="text-3xl font-semibold mb-2">Account management</h1>
    <p className="text-gray-600 text-sm">Make changes to your personal information or account type.</p>
  </div>

  {/* Your Account Section */}
  <div>
    <h2 className="text-lg font-medium mt-4">Your account</h2>
    <div className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-gray-700 text-xs font-medium">Email • Private</label>
        <input
          type="email"
          value="rinujouhar@gmail.com"
          readOnly
          className="w-full mt-1 p-2 border border-gray-300 rounded-md  text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium">Password</label>
        <div className="flex relative mt-1">
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="********"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            👁️ {/* Replace with an eye icon */}
          </button>
        </div>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Change
        </button>
      </div>
    </div>
  </div>

  

  {/* Personal Information */}
  <div>
    <h2 className="text-lg font-medium">Personal information</h2>
    <div>
      <label className="block text-gray-700 font-medium">Date of birth</label>
      <input
        type="date"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
      />
    </div>
  </div>

  {/* Gender */}
  <div>
    <h2 className="text-lg font-medium">Gender</h2>
    <div className="flex space-x-4 mt-2">
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
        />
        Male
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
        />
        Female
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
        />
        Non-binary
      </label>
    </div>
  </div>

  {/* Country/Region */}
  <div>
    <label className="block text-gray-700 font-medium">Country/region</label>
    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
      <option>India (भारत)</option>
      <option>United States</option>
      <option>United Kingdom</option>
      <option>Australia</option>
    </select>
  </div>

  {/* Language */}
  <div>
    <label className="block text-gray-700 font-medium">Language</label>
    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
      <option>English (India)</option>
      <option>English (US)</option>
      <option>Hindi</option>
      <option>Tamil</option>
    </select>
  </div>

  {/* Deactivation and Deletion */}
  <div>
    <h2 className="text-lg font-medium">Deactivation and deletion</h2>
    <div className="mt-4 space-y-4">
      <div>
        <h3 className="font-medium">Deactivate account</h3>
        <p className="text-sm text-gray-600">
          Temporarily hide your profile, Pins, and boards.
        </p>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Deactivate account
        </button>
      </div>
      <div>
        <h3 className="font-medium">Delete your data and account</h3>
        <p className="text-sm text-gray-600">
          Permanently delete your data and everything associated with your account.
        </p>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Delete account
        </button>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-between mt-4">
    <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
      Reset
    </button>
    <button className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">
      Save
    </button>
  </div>
</div>


  )
}

export default AccountManagement