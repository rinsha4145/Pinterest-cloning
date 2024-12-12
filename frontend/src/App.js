import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Home/Signup';
import Login from './Components/Home/Login';
import Navbar from './Components/Home/Navbar';
import Slide1 from './Components/Home/Slide1';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/Home/ForgotPassword';
import Create from './Components/Home/Create';
import Explore from './Components/Home/Explore';
import Category from './Components/Home/Category';
import { useSelector } from 'react-redux';
import ResetPassword from './Components/Home/ResetPassword';

function App() {
  const { user } = useSelector((state) => state.user);

  return (
   <>
   <Navbar />
   <Routes>
    {!user ?<Route path='/' element={<Slide1/>}/>:<Route path='/' element={<Home/>}/>}
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/create' element={<Create/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/category/:category' element={<Category/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset_password/:id/:token' element={<ResetPassword/>}/>








   </Routes>
   </>
  )
}

export default App