import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Home/Navbar";
import AdmNavbar from "./Components/Admin/Navbar";
import Loading from "./Components/Common/Loading"; // Custom spinner component
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Slides = lazy(() => import("./Components/Home/Slides"));
const Home = lazy(() => import("./Components/Home/Home"));
const ForgotPassword = lazy(() => import("./Components/Home/ForgotPassword"));
const Create = lazy(() => import("./Components/Home/CreatePost"));
const Explore = lazy(() => import("./Components/Home/Explore"));
const Category = lazy(() => import("./Components/Home/Category"));
const ResetPassword = lazy(() => import("./Components/Home/ResetPassword"));
const ProfilePage = lazy(() => import("./Components/User/ProfilePage"));
const Settings = lazy(() => import("./Components/User/Settings/Settings"));
const Created = lazy(() => import("./Components/User/Created"));
const Pinned = lazy(() => import("./Components/User/Pinned"));
const ViewBoard = lazy(() => import("./Components/User/ViewBoard"));
const ViewPost = lazy(() => import("./Components/Home/ViewPost"));
const ViewOtherUserProfile = lazy(() => import("./Components/User/ViewOtherUserProfile"));
const EditProfile = lazy(() => import("./Components/User/Settings/EditProfile"));
const ChangePassword = lazy(() => import("./Components/User/Settings/ChangePassword"));
const AccountManagement = lazy(() => import("./Components/User/Settings/AccountManagement"));
const DeleteAccount = lazy(() => import("./Components/User/Settings/DeleteAccount"));
const AdmLogin = lazy(() => import("./Components/Admin/Login"));
const AdminPage = lazy(() => import("./Components/Admin/Home"));
const Users = lazy(() => import("./Components/Admin/Users"));
const Posts = lazy(() => import("./Components/Admin/Posts"));
const Report = lazy(() => import("./Components/Admin/Report"));
const ViewUser = lazy(() => import("./Components/Admin/ViewUser"));
const ViewPostDetails = lazy(() => import("./Components/Admin/ViewPostDetails"));

function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const isAdminLogin = location.pathname === "/adminlogin";

  return (
    <Suspense fallback={<Loading />}>
        <Routes>
        <Route path="/adminlogin" element={<AdmLogin />} />
      </Routes>
      {!user?.admin ? (
        <>
          {!isAdminLogin && <Navbar />}
          <Routes>
            {!user ? (
              <Route path="/" element={<Slides />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}
            <Route path="/create" element={<Create />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/viewpost/:_id/:category" element={<ViewPost />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/userpage/:id" element={<ViewOtherUserProfile />} />
            <Route path="/created" element={<Created />} />
            <Route path="/pin" element={<Pinned />} />
            <Route path="/viewboard/:id" element={<ViewBoard />} />
            <Route path="/changepass" element={<ChangePassword />} />
            <Route path="/close-account" element={<DeleteAccount />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="account-settings" element={<AccountManagement />} />
            </Route>
          </Routes>
          <ToastContainer
            autoClose={1000}
            position="top-center"
            hideProgressBar={true}
            closeOnClick
            pauseOnHover
            draggable
            toastStyle={{
              width: "auto",
              maxWidth: "90%",
              padding: "10px 20px",
              wordBreak: "break-word",
            }}
          />
        </>
      ) : (
        <>
          <AdmNavbar />
          <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/view/:id" element={<ViewUser />} />
            <Route path="/viewpostdetails/:id" element={<ViewPostDetails />} />
          </Routes>
        </>
      )}
    </Suspense>
  );
}

export default App;
