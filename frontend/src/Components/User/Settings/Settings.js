import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Settings() {
  const { user } = useSelector((state) => state.user);
  console.log("user",user)
  return (
    
    <>
    <div className="flex">
  <div className="w-1/4 p-6 space-y-4 mt-6">
    
    <ul className="space-y-4">
      <li><Link to="">Edit profile</Link></li>
      <li><Link to="">Account management</Link></li>
      <li><Link to="">Profile visibility</Link></li>
      <li><Link to="">Tune your home feed</Link></li>
      <li><Link to="">Claimed accounts</Link></li>
      <li><Link to="">Social permissions</Link></li>
      <li><Link to="">Notifications</Link></li>
      <li><Link to="">Privacy and data</Link></li>
      <li><Link to="">Security</Link></li>
      <li><Link to="">Branded Content</Link></li>
    </ul>
  </div>
    
  <div className="flex-1 bg-white p-6 font-sans w-[50px]">
    <h2 className="text-3xl  mb-4">Edit profile</h2>
    <p className="text-base mb-4">Keep your personal details private. Information you add here is<br/> visible to anyone who can view your profile.</p>

    <div className="flex items-center mb-4">
      <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" />
      <button className="px-4 py-2 bg-gray-300 rounded-full text-sm">Change</button>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="first-name">First name</label>
        <input type="text" id="first-name" className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="surname">Surname</label>
        <input type="text" id="surname" className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="about">About</label>
      <textarea id="about" rows="4" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Tell us about yourself"></textarea>
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="website">Website</label>
      <input type="text" id="website" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="website">Username</label>
      <input type="text" id="website" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>

    <div className="mt-6 flex space-x-4">
      <button className="px-6 py-2 bg-gray-200 rounded-md text-sm">Reset</button>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm">Save</button>
    </div>
  </div>
</div>
</>
  )
}

export default Settings