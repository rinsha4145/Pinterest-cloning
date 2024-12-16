import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/AxioaInstance';
import handleAsync from '../../Utils/HandleAsync';

function Settings() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [userdata, setUserData] = useState({
    profileimage:'',
    firstname: '',
    lastname: '',
    about:'',
    website: '',
    username: '',
  })
  const [showModal, setShowModal] = useState(false);
 
  useEffect(() => {
    const fetchData = handleAsync(async () => {
        const response = await axiosInstance.get('/me');
        setUserData(response.data.profile)
        console.log("first",userdata)
    });
    fetchData();
  }, [userdata.email]);
  const handleChange = (event) => {
    const { name, value,type,files } = event.target;
    setUserData(prevProduct => ({...prevProduct,[name]:type === "file" ? files[0] : value, }));
  };
  const handleSubmit = handleAsync( (e) => {
    const update=async()=>{
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userdata).forEach((key) => {
      const value = userdata[key];
      if (value instanceof File) {
        formData.append(key, value); 
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));  
      } else {
        formData.append(key, value);
      }
    });
    const response= await axiosInstance.patch('/editprofile', formData )
    if (response.status >= 200 && response.status < 300) {
     alert('Product updated successfully');
    }
  }
  update()
  });
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
      <img src={userdata.profileimage || ""}alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" />
      <button className="px-4 py-2 bg-gray-300 rounded-full text-sm" onClick={() => setShowModal(true)} >Change</button>
    </div>
    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h3 className="text-xl font-semibold text-center mb-4">
              Change your picture
            </h3>
            <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 text-center"
          />
            
            <button
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 block mx-auto"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="first-name">First name</label>
        <input type="text" name="firstname" id="first-name" className="w-full p-2 border border-gray-300 rounded-md" value={userdata.firstname || ""} onChange={handleChange}/>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="surname">Surname</label>
        <input type="text" id="surname" name="lastname" className="w-full p-2 border border-gray-300 rounded-md" value={userdata.lastname || ""} onChange={handleChange} />
      </div>
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="about">About</label>
      <textarea id="about" rows="4" name="about" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Tell us about yourself" value={user.about || ""} onChange={handleChange}></textarea>
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="website">Website</label>
      <input type="text" id="website" name='website' className="w-full p-2 border border-gray-300 rounded-md" value={userdata.website|| ""} onChange={handleChange}/>
    </div>
    <div className="mt-4">
      <label className="block text-gray-700 mb-2" htmlFor="website">Username</label>
      <input type="text" id="username" name="username"className="w-full p-2 border border-gray-300 rounded-md" value={userdata.username|| ""} onChange={handleChange} />
    </div>

    <div className="mt-6 flex space-x-4">
      <button className="px-6 py-2 bg-gray-200 rounded-md text-sm">Reset</button>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm" onClick={handleSubmit}>Save</button>
    </div>
  </div>
</div>
</>
  )
}

export default Settings