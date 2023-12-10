import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CoursesPage from "./pages/Courses/CoursesPage";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Contact from "./pages/Contact/Contact";
import RequestCourse from "./pages/RequestCourse/RequestCourse";
import About from "./pages/About/About";
import Subscribe from "./pages/Payments/Subscribe";
import NotFound from "./components/NotFound";
import PaymentSuccess from "./pages/Payments/PaymentSuccess";
import PaymentFail from "./pages/Payments/PaymentFail";
import CourseDetailPage from "./pages/CourseDetail/CourseDetailPage";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import ChangePassword from "./pages/Profile/ChangePassword";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import CreateCourse from "./pages/Admin/CreateCourse/CreateCourse";
import AdminCourses from "./pages/Admin/AdminCourses/AdminCourses";
import Users from "./pages/Admin/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyProfile } from "./reduxToolkit/api_functions/user";
import { ProtectedRoute } from "protected-route-react";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    getMyProfile(dispatch);
  }, [dispatch]);
  return (
    <main className="themeClass">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<RequestCourse />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin routes */}

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/createcourse" element={<CreateCourse />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </main>
  );
}

export default App;
