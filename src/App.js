
import './App.css';
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
// import Dashboard from "./pages/dashboard/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import Navbar from "./components/common/Navbar";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import Settings from './components/core/Dashboard/Settings';
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { ACCOUNT_TYPE } from "./ultilites/constants";
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';
import AdminDash from "./components/core/Dashboard/adminDashboad/AdminDash";
import UserAdmin from "./components/core/Dashboard/userDashboad/UserAdmin";
import { useSelector } from 'react-redux';
import Chat from './components/core/Dashboard/userchat/Chat';


function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="overflow-x-hidden" >
     <Navbar/>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
        <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />




          {/* dashboards */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />
            <Route path="/dashboard/my-chat" element={<Chat/>} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
            

               
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor/>} />
                {/* <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
                {/* <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                /> */}
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/admin" element={<AdminDash />} />
                {/* <Route path="dashboard/admin-courses" element={<AdminCourses />} /> */}
                {/* <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
                {/* <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                /> */}
                <Route path="dashboard/users-admin" element={<UserAdmin />} />
                {/* <Route path="SignupAdmin" element={<SignupAdmin />} /> */}
                {/* <Route path="CreateCategory" element={<CreateCategory />} /> */}
                {/* <Route path="CreateBlog" element={<CreateBlog />} />
                <Route path="eventcreate" element={<EventForm />} /> */}
                
                <Route
                  path="SignupAdmin/verify-email"
                  element={<VerifyEmail />}
                />
              </>
            )}
          </Route>
        
     </Routes>
    
    </div>
  );
}

export default App;
