import React, { Component, useEffect, useRef, useState } from "react";
import ShopPage from "./ShopPage";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import chair from "../../assets/img/chair.png";
import Product from "../shop_pages/Product_Pages/Product";
import AddModal from "../shop_pages/AddModal";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSales } from "./getSales";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Spin, Table } from "antd";
import { Navigate } from "../CheckingFunctions";
function Clients() {
    let navigate = useNavigate()
    const ShopCardData = () => [
        {
          title: "Client img",
          dataIndex: "img",
          key: "img",
          render: (_, record) => (
            <p >
              <img src="https://cdn-icons-png.flaticon.com/128/6009/6009864.png" className="inbasket_img" alt="" />
            </p>
          ),
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (_, record) => (
            <p>
    
              {record.username}
            </p>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          render: (_, record) => <p>{record.phone}</p>,
        },
        
        {
          title: "Address",
          key: "address",
          render: (_, record) => (
            <p>
              {record.address}
            </p>
          ),
        },
        {
            title: "View",
            key: "view",
            render: (_, record) => (
              <button onClick={() => navigate(`/shop/clients/view?&key=${record.id}`)}>View</button>
            ),
          },
        
        
      ];
  const [clients, setClients] = useState([]);
  const [shunchaki, setShunchaki] = useState([]);
  const [load, setLoad] = useState(true);
  async function getClients() {
    //   const querySnapshot = await getDocs(collection(db, "products"));
    //   return querySnapshot.docs.forEach((doc) => {
    //     return doc
    //   });

    // console.log(userEmail);
    const getClients = [];
    const clients = await getDocs(collection(db, `clients`));
    // console.log(products.docChanges());
    clients.docChanges().forEach((item) => {
      getClients.push({
        ...item.doc.data(),
        id: item.doc.id,
      });
      // setSave(getProductsFromFirebase)
      // setLoad(false)
    });
    return getClients;
  }

  useEffect(() => {
    async function get() {
      const clientss = await getClients();
      setClients(clientss);
      setLoad(false)
    }
    get();
  }, [shunchaki]);
  console.log(clients);

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
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        <div className="products">
          <div className="articles">
            <h1>Mijozlar</h1>

            <AddModal setShunchaki={setShunchaki}/>
          </div>
          <div className="products_wrapper">
            <div className="filters">
              <input
                type="search"
                className="search"
                placeholder="🔍 Qidirish"
                ref={inputRef}
                name=""
                id=""
              />
            </div>
            <div className="cards_clients">
              {load == true ? (
                <Spin size="large" />
              ) : (
                <Table
                  style={{ width: "1110px" }}
                  columns={ShopCardData()}
                  dataSource={clients}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
