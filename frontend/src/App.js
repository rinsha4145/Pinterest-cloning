import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ToastContainer} from 'react-toastify'
import Navbar from './Components/Home/Navbar';
import Slides from './Components/Home/Slides';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/Home/ForgotPassword';
import Create from './Components/Home/CreatePost';
import Explore from './Components/Home/Explore';
import Category from './Components/Home/Category';
import ResetPassword from './Components/Home/ResetPassword';
import ProfilePage from './Components/User/ProfilePage';
import Settings from './Components/User/Settings/Settings';
import Created from './Components/User/Created';
import Pinned from './Components/User/Pinned';
import ViewBoard from './Components/User/ViewBoard';
import ViewPost from './Components/Home/ViewPost';
import ViewOtherUserProfile from './Components/User/ViewOtherUserProfile';
import EditProfile from './Components/User/Settings/EditProfile';
import ChangePassword from './Components/User/Settings/ChangePassword';
import AccountManagement from './Components/User/Settings/AccountManagement';
import DeleteAccount from './Components/User/Settings/DeleteAccount';
import AdmNavbar from './Components/Admin/Navbar';
import AdmLogin from './Components/Admin/Login';
import AdminPage from './Components/Admin/Home';
import Users from './Components/Admin/Users';
import Posts from './Components/Admin/Posts';
import Report from './Components/Admin/Report';
import ViewUser from './Components/Admin/ViewUser';
import ViewPostDetails from './Components/Admin/ViewPostDetails';
function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const isAdminLogin = location.pathname === '/adminlogin';
  return (
    <>
     {/* Conditionally render Navbar */}
    <Routes>
      <Route path='/adminlogin' element={<AdmLogin />} />
    </Routes>
    {!user?.admin ? (
      <>
      {!isAdminLogin && <Navbar />}
        <Routes>
          {!user ? (
            <Route path='/' element={<Slides />} />
          ) : (
            <Route path='/' element={<Home />} />
          )}
          <Route path='/create' element={<Create />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/viewpost/:_id/:category' element={<ViewPost />} />
          <Route path='/category/:category' element={<Category />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset_password/:id/:token' element={<ResetPassword />} />
          <Route path='/profilepage' element={<ProfilePage />} />
          <Route path='/userpage/:id' element={<ViewOtherUserProfile />} />
          <Route path='/created' element={<Created />} />
          <Route path='/pin' element={<Pinned />} />
          <Route path='/viewboard/:id' element={<ViewBoard />} />
          <Route path='/changepass' element={<ChangePassword />} />
          <Route path='/close-account' element={<DeleteAccount />} />
          <Route path='/settings' element={<Settings />}>
            <Route path='editprofile' element={<EditProfile />} />
            <Route path='account-settings' element={<AccountManagement />} />
          </Route>
        </Routes>
        <ToastContainer
          autoClose={1000}
          position='top-center'
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
          toastStyle={{
            width: 'auto',
            maxWidth: '90%',
            padding: '10px 20px',
            wordBreak: 'break-word',
          }}
        />
      </>
    ) : (
      <>
      <AdmNavbar/>
        <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/reports" element={< Report/>} />
        <Route path="/view/:id" element={< ViewUser/>} />
        <Route path="/viewpostdetails/:id" element={< ViewPostDetails/>} />







        </Routes>
      </>
    )}
  </>
);
  
}

export default App