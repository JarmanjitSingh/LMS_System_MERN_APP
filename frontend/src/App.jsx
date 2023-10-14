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

function App() {
  return (
    <main className="themeClass">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<RequestCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
