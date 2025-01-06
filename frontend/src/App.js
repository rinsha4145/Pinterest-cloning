import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import Signup from './Components/Home/Signup';
import Login from './Components/Home/Login';
import Navbar from './Components/Home/Navbar';
import Slides from './Components/Home/Slides';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/Home/ForgotPassword';
import Create from './Components/Home/Create';
import Explore from './Components/Home/Explore';
import Category from './Components/Home/Category';
import { useSelector } from 'react-redux';
import ResetPassword from './Components/Home/ResetPassword';
import ProfilePage from './Components/User/ProfilePage';
import Settings from './Components/User/Settings/Settings';
import Created from './Components/User/Created';
import Pinned from './Components/User/Pinned';
import ViewBoard from './Components/User/ViewBoard';
import ViewPost from './Components/Home/ViewPost';
import ViewOtherUserProfile from './Components/User/ViewOtherUserProfile';
import {ToastContainer} from 'react-toastify'
import EditProfile from './Components/User/Settings/EditProfile';
import ChangePassword from './Components/User/Settings/ChangePassword';
import AccountManagement from './Components/User/Settings/AccountManagement';

function App() {
  const { user } = useSelector((state) => state.user);
  
  return (
   <>
   <Navbar />
   <Routes>
    {!user ?<Route path='/' element={<Slides/>}/>:<Route path='/' element={<Home/>}/>}
    <Route path='/create' element={<Create/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/viewpost/:_id/:category' element={<ViewPost/>}/>
    <Route path='/category/:category' element={<Category/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset_password/:id/:token' element={<ResetPassword/>}/>
    <Route path='/profilepage' element={<ProfilePage/>}/>
    <Route path='/userpage/:id' element={<ViewOtherUserProfile/>}/>
    <Route path='/created' element={<Created/>}/>
    <Route path='/pin' element={<Pinned/>}/>
    <Route path='/viewboard/:id' element={<ViewBoard/>}/>
    <Route path='/changepass' element={<ChangePassword/>}/>

    
    <Route path="/settings" element={<Settings />}>
    <Route path="editprofile" element={<EditProfile />} />
    <Route path="account-settings" element={<AccountManagement />} /></Route>
    

   </Routes>
   <ToastContainer   
        autoClose={1000}  
        position="top-center"  
        hideProgressBar={true} 
        closeOnClick 
        pauseOnHover
        draggable
        toastStyle={{
          width: 'auto', // Adjust width dynamically based on content
          maxWidth: '90%', // Optional: Prevents overly wide toast on large screens
          padding: '10px 20px', // Optional: Adds padding for better readability
          wordBreak: 'break-word', // Handles long words gracefully
        }}
        />
   </>
  )
}

export default App