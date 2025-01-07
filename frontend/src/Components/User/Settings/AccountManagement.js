import React, { lazy, useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { EmailIcon } from 'react-share'
import handleAsync from '../../Utils/HandleAsync'
import axiosInstance from '../../Utils/AxioaInstance'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import {  updateUser } from '../../Redux/UserSlice';
import ChangePassword from './ChangePassword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

function AccountManagement() {
  const { user } = useSelector((state) => state.user);
   const [originalData, setOriginalData] = useState(user);
    const [view, setView] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleNewPasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible); // Toggle the password visibility
      };
    const [value, setValue] = useState({
        email: '',birthdate:'',country:'',gender:'',language:'',
    })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = handleAsync(async () => {
        const response = await axiosInstance.get('/me');
        const profile = response.data.profile;

        // Ensure birthdate is in the correct format (YYYY-MM-DD)
        const formattedBirthdate = profile.birthdate
          ? new Date(profile.birthdate).toISOString().split('T')[0] // Convert date to YYYY-MM-DD format
          : '';
    
        setValue({
          ...profile,
          birthdate: formattedBirthdate, // Set the birthdate in the correct format
        });
      
        
    });
    fetchData();
    
    }, []);
    console.log(value)
    const options = useMemo(() => countryList().getData(), [])
    
    const isFormChanged = JSON.stringify(value) !== JSON.stringify(user);

    
        const handleChange = (event) => {
            const { name, value } = event.target;
            
            // Update user data state for any input change
            setValue((prevData) => ({
              ...prevData,
              [name]: value, // Directly store the value from input (text, radio, select)
            }));
        };
        const handleGenderChange = (event) => {
            setValue((prevData) => ({
              ...prevData,
              gender: event.target.value,  // Update gender directly based on the selected radio button
            }));
          };
          const handleCountryChange = (selectedOption) => {
            setValue((prevData) => ({
              ...prevData,
              country: selectedOption.value,  // Use the country value from the object
            }));
          };
          
          
        const handleReset = () => {
            setValue(originalData);
      
        };
       
         
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const formData = new FormData();
            
            // Append fields only if they are different from the original values
            Object.keys(value).forEach((key) => {
              const updatedValue = value[key];
              const originalValue = user[key];
              
              // Skip specific fields if they are unchanged
              if (updatedValue !== originalValue && !["followers", "following", "updatedAt", "__v","deletionScheduled"].includes(key)) {
                formData.append(key, updatedValue); // Append each field to FormData
              }
            });
          
            try {
              const response = await axiosInstance.put("/editprofile", formData);
          
              if (response.status >= 200 && response.status < 300) {
                dispatch(updateUser(response.data.updatedProfile));
                console.log(response.data.updatedProfile);
              }
            } catch (error) {
              console.error('Error updating profile:', error);
              toast.error('Failed to update profile. Please try again.');
            }
          };
          
          
  
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
          value={value.email}
            onChange={handleChange}
            name='email'
          className="w-full mt-1 p-2 border border-gray-300 rounded-md  text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium">Password</label>
        <div className="flex relative mt-1">
           <input
          type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password types
          onChange={(e) => setPassword(e.target.value)} // Update the newPassword state on input change
          required
          placeholder="*********"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <button
          type="button"
          onClick={handleNewPasswordToggle} // Call the function to toggle visibility
          className="absolute right-2 top-2"
        >
          <FontAwesomeIcon
            icon={isPasswordVisible ? faEyeSlash : faEye} // Switch between eye and eye-slash icon
            size="sm"
            color="#000"
          />
          </button>
         
        </div>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={()=>setView(true)}>
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
        name='birthdate'
        value={value.birthdate}
        onChange={handleChange}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
      />
    </div>
  </div>

  {/* Gender */}
  <div>
    <h2 className="text-lg font-medium">Gender</h2>
    <div className="flex space-x-4 mt-2" >
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
          value="Male"
          checked={value.gender === 'Male'}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
          value="Female"
          checked={value.gender === 'Female'}
          onChange={handleGenderChange}
        />
        Female
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          className="mr-2"
          value="Non-binary"

          checked={value.gender === 'Non-binary'}
          onChange={handleGenderChange}
        />
        Non-binary
      </label>
    </div>
  </div>

  {/* Country/Region */}
  <div>
    <label className="block text-gray-700 font-medium">Country/region</label>
    <Select options={options}  value={options.find((option) => option.value === value.country)} onChange={handleCountryChange} />
  </div>

  {/* Language */}
  <div>
    <label className="block text-gray-700 font-medium">Language</label>
    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={value.language} onChange={handleChange}>
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
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" >
          Deactivate account
        </button>
      </div>
      <div>
        <h3 className="font-medium">Delete your data and account</h3>
        <p className="text-sm text-gray-600">
          Permanently delete your data and everything associated with your account.
        </p>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={()=>navigate('/close-account')}>
          Delete account
        </button>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
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
      {view?<ChangePassword setView={setView} password={password}/>:null}
</div>


  )
}

export default AccountManagement