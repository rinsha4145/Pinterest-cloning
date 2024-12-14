import React from 'react'
import { Link } from 'react-router-dom'

function Settings() {
  return (
    <>
    <div class="flex">
  <div class="w-1/4 p-6 space-y-4 mt-6">
    
    <ul class="space-y-4">
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
    
  <div class="flex-1 bg-white p-6">
    <h2 class="text-3xl font-semibold mb-4">Edit profile</h2>
    <p class="text-gray-600 mb-4">Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>

    <div class="flex items-center mb-4">
      <img src="https://via.placeholder.com/150" alt="Profile" class="w-16 h-16 rounded-full object-cover mr-4" />
      <button class="px-4 py-2 bg-gray-300 rounded-full text-sm">Change</button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 mb-2" for="first-name">First name</label>
        <input type="text" id="first-name" class="w-full p-2 border border-gray-300 rounded-md" value="Rinujouhar" />
      </div>
      <div>
        <label class="block text-gray-700 mb-2" for="surname">Surname</label>
        <input type="text" id="surname" class="w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-gray-700 mb-2" for="about">About</label>
      <textarea id="about" rows="4" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Tell us about yourself">sfcws</textarea>
    </div>

    <div class="mt-4">
      <label class="block text-gray-700 mb-2" for="website">Website</label>
      <input type="text" id="website" class="w-full p-2 border border-gray-300 rounded-md" />
    </div>

    <div class="mt-6 flex space-x-4">
      <button class="px-6 py-2 bg-gray-200 rounded-md text-sm">Reset</button>
      <button class="px-6 py-2 bg-blue-500 text-white rounded-md text-sm">Save</button>
    </div>
  </div>
</div>
</>
  )
}

export default Settings