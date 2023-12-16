import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
