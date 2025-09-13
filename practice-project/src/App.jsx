import { Route, Routes } from "react-router-dom"
import "./App.css";
import Home from "./page/home";
import Login from "./page/login";
import SignUp from "./page/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
