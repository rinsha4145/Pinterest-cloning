import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Home/Signup';
import Login from './Components/Home/Login';
import Navbar from './Components/Home/Navbar';
import Slide1 from './Components/Home/Slide1';
function App() {
  return (
   <>
   <Navbar />
   <Routes>
   <Route path='/' element={<Slide1/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>

   </Routes>
   </>
  )
}

export default App