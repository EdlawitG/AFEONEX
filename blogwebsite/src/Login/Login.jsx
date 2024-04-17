import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { isLoggedIn, error, loading } = useSelector((state) => state.user);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      dispatch(login(user));
      if (isLoggedIn) {
        console.log("loggedin");
        toast.success("Logged in Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(error);
    }
  };

  return (
    <div className="login">
      <ToastContainer position="top-right" autoClose={3000} />
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          value={user.email}
          name="email"
          onChange={onInputChange}
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          value={user.password}
          name="password"
          onChange={onInputChange}
          placeholder="Enter your password..."
        />
        <button className="loginButton" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
