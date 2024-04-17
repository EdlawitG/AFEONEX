import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/userSlice";
function Topbar() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              About
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              contact
            </Link>
          </li>
          <li className="topListItem">
            <Link to="write" className="link">
              Write
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {isLoggedIn && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {isLoggedIn ? (
          <img
            className="topImg"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="login" className="link">
                Login
              </Link>
            </li>
            <li className="topListItem">
              <Link to="register" className="link">
                Register
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Topbar;
