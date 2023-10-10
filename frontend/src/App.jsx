import Navbar from "./components/Navbar";
import "./index.css";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home";

function App() {

  return (
    <main className="themeClass">
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
    </BrowserRouter>
    </main>
  )
}

export default App
