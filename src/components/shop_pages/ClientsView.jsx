import React, { Component, useEffect, useRef, useState } from "react";
import ShopPage from "./ShopPage";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import chair from "../../assets/img/chair.png";
import Product from "../shop_pages/Product_Pages/Product";
import AddModal from "../shop_pages/AddModal";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { getSales } from "./getSales";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Spin, Table } from "antd";
import { Navigate } from "../CheckingFunctions";
import { getProductsFromFirebase } from "../firebase/GetProductsFromFirebase";
function ClientsView() {
  const id = window.location.href.slice(window.location.href.search("&key=") + 5, window.location.href.length)
  


  const [client, setClient] = useState([]);
  const [shunchaki, setShunchaki] = useState([]);
  const [load, setLoad] = useState(true);
  async function getClient() {
    //   const querySnapshot = await getDocs(collection(db, "products"));
    //   return querySnapshot.docs.forEach((doc) => {
    //     return doc
    //   });

    // console.log(userEmail);
    
    const getClient  = await getDoc(doc(db, `clients`, id));
    
    return getClient.data();
  }

  useEffect(() => {
    async function get() {
      const clientt = await getClient();
      setClient(clientt);
      setLoad(false)
    }
    get();
  }, [shunchaki]);
  

  // let arr = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).sales : [];
  // const [arrr, setArrr] = useState(arr);
  // useEffect(() => {
  //         arrr.map((item, i) => <Product  img={item.img} price={item.price} name={item.name} discount={item.discount}/>)
  // }, [arrr])
  const url = "https://reqres.in/api/users?page=1";
  // axios(url).then(res => console.log(res.data.data))
  const inputRef = useRef(null);
  // function search(){
  //     const newArr = arr.filter(item => item.name.toLowerCase().includes(inputRef.current.value.toLowerCase()));
  //     setArrr(newArr.sort((a,b) => {return a.price - b.price}))
  // }

  const [arrr, setArrr] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");

  const [sales, setSales] = useState([])
    useEffect(() => {
        async function get(){
            const saless = await getSales()
            setSales(saless)
        }
        get()
    }, [])
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
        <div className="products">
          {/* <div className="articles">
            <h1>Mijozlar</h1>

            <AddModal setShunchaki={setShunchaki}/>
          </div> */}
          {/* <div className="products_wrapper"> */}
            
          <div className="centered_">
          <div className="user_card">
            <div className="user_img_wrapper">
              <img src="https://cdn-icons-png.flaticon.com/128/6009/6009864.png" width={"100px"} height={"100px"} alt="" />
            </div>
            <div className="user_data">
              <div className="part">
                <h1>{client.username}</h1>
                <h3>{client.email}</h3>
              </div>
              <div className="user_history">
                <div>
                  <h2>Products</h2>
                  <h2>{arrr.length}</h2>
                </div>
                <div>
                  <h2>Sales</h2>
                  <h2>{sales.length}</h2>
                </div>
                <div>
                  <h2>Status</h2>
                  <h2>{navigator.onLine ? "🟢 Online" : "🔴 Offline"}</h2>
                </div>
              </div>
              <div className="part">
                <h3>{client.phone}</h3>
                <h2>{client.address}</h2>
                {/* <button><Link to="https://www.instagram.com/abduvasiyev.f/">Send Message</Link></button> */}
              </div>
            </div>
          </div>
        </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default ClientsView;
