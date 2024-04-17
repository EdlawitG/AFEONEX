import React from "react";
import "./sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
      <span className="sidebarTitle">About Me</span>
      <img
        src="../../aboutme.jpeg"
        alt="aboutme"
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nisi
        ducimus labore soluta, cum maiores explicabo assumenda! Quis ex
        voluptatem asperiores quam nostrum sint magni debitis quisquam, laborum
        quidem a.
      </p>
      </div>
      <div className="sidebarItems">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Cinema</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow us</span>
        <div className="sidebarSoical">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
