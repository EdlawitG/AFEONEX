import { useSelector } from "react-redux";
import "./App.css";
import Login from "./Login/Login";
import Home from "./Pages/Home/Home";
import Setting from "./Pages/Home/Setting/Setting";
import Register from "./Register/Register";
import Single from "./Single/Single";
import Topbar from "./Topbar/topbar";
import Write from "./Write/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WriteUpdate from "./Write/WriteUpdate";
function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="setting" element={<Setting />} />
        <Route path="blog/:blogId" element={<Single />} />
        <Route path="write" element={isLoggedIn ? <Write /> : <Login />} />
        <Route path="edit/:blogId" element={<WriteUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
