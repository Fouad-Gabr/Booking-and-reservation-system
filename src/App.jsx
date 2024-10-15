import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Time from "./pages/Time/Time";
import Review from "./pages/Review/Review";
import AdminDashboard from "./pages/DashBoard/AdminDashboard";

function App() {
  return (
    
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Time />} />
        <Route path="/login" element={<Review />} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
