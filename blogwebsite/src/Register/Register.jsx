import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user))
      .then(() => {
        if (isLoggedIn) {
          console.log("loggedin");
          navigate("/login");
        }
        if (error) {
          toast.error(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="absolute right-0 top-0 mt-20 w-[40px] max-w-sm p-4"
      />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Fullname</label>
        <input
          className="registerInput"
          type="text"
          value={user.name}
          name="name"
          onChange={onInputChange}
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          value={user.email} // Binding to user.email
          name="email"
          onChange={onInputChange}
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          value={user.password}
          name="password"
          onChange={onInputChange}
          placeholder="Enter your password..."
        />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
