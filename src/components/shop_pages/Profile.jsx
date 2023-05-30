import React, { Component } from "react";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import img_user from "../../assets/img/user_img.avif";
import { Navigate } from "../CheckingFunctions";
import { Link, NavLink } from "react-router-dom";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        <div className="centered_">
          <div className="user_card">
            <div className="user_img_wrapper">
              <img src={img_user} alt="" />
            </div>
            <div className="user_data">
              <div className="part">
                <h1>{user.userName}</h1>
                <h3>{userEmail}</h3>
              </div>
              <div className="user_history">
                <div>
                  <h2>Products</h2>
                  <h2>1</h2>
                </div>
                <div>
                  <h2>Sales</h2>
                  <h2>0</h2>
                </div>
                <div>
                  <h2>Status</h2>
                  <h2>{navigator.onLine ? "🟢 Online" : "🔴 Offline"}</h2>
                </div>
              </div>
              <div className="part">
                <button><Link to="https://www.instagram.com/abduvasiyev.f/">Send Message</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
