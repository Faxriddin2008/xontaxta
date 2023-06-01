import React, { Component, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import img_user from "../../assets/img/user_img.avif";
import { Navigate } from "../CheckingFunctions";
import { Link, NavLink } from "react-router-dom";
import { getProductsFromFirebase } from "../firebase/GetProductsFromFirebase";
function Profile() {
  const [arrr, setArrr] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");

  useEffect(() => {
    async function getProducts() {
      const products = await getProductsFromFirebase();
      // console.log(products);
      // const productss = query(
      //   collection(db, "fabduvasiyev@gmail.com.products"),
      //   where("price", "<", 10)
      // );
      // const q = await getDocs(productss);
      // q.docs.map(item => console.log(item.data()))
      // console.log(products.firestore.app.name);
      // console.log(productss);
      setArrr(products);
      
    }
    getProducts();
  }, []);
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
                  <h2>{arrr.length}</h2>
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
