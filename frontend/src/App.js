import React from 'react'
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const { user } = useSelector((state) => state.user);

  return (
   <>
   <Navbar />
   <Routes>
    {!user ?<Route path='/' element={<Slides/>}/>:<Route path='/' element={<Home/>}/>}
    <Route path='/create' element={<Create/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/category/:category' element={<Category/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset_password/:id/:token' element={<ResetPassword/>}/>
    <Route path='/profilepage' element={<ProfilePage/>}/>


   </Routes>
   </>
  )
}

export default App