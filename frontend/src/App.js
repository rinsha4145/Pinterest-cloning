import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Home/Signup';
import Login from './Components/Home/Login';
import Navbar from './Components/Home/Navbar';
import Slide1 from './Components/Home/Slide1';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/Home/ForgotPassword';

function App() {
  return (
   <>
   <Navbar />
   <Routes>
   <Route path='/' element={<Slide1/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>



   </Routes>
   </>
  )
}

export default App