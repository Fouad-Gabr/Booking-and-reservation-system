import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home"; // تأكد من مسار Home
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<div>For Businesses Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
