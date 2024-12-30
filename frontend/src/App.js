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
import Settings from './Components/User/Settings/Settings';
import Created from './Components/User/Created';
import Pinned from './Components/User/Pinned';
import ViewBoard from './Components/User/ViewBoard';
import ViewPost from './Components/Home/ViewPost';
import ViewOtherUserProfile from './Components/User/ViewOtherUserProfile';

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
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/created' element={<Created/>}/>
    <Route path='/pin' element={<Pinned/>}/>
    <Route path='/viewboard/:id' element={<ViewBoard/>}/>






   </Routes>
   </>
  )
}

export default App