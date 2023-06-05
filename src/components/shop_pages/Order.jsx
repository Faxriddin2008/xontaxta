import React, { Component, useEffect, useRef, useState } from "react";
import ShopPage from "./ShopPage";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import chair from "../../assets/img/chair.png";
import Product from "../shop_pages/Product_Pages/Product";
import AddModal from "../shop_pages/Product_Pages/Modal";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getSales } from "./getSales";
import { Button, Select, Spin, Table } from "antd";
import { getOrder } from "./getOrder";
function Order() {
  const provinceData = [ "Kutilmoqda" , "Rad etildi", "Sotildi"];
  const [saless, setSaless] = useState([]);
  const [sales, setSales] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    async function get() {
      const saless = await getOrder();
      setSales(saless);
      setSaless(saless);
    }
    get();
    setLoad(false);
  }, [load]);
  console.log(sales);
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
  function setStatus(value){
    console.log(value);
  }
  const ShopCardData = () => [
    {
      title: "Product img",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <p>
          <img src={record.img} className="inbasket_img" alt="" />
        </p>
      ),
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.name}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p>{record.price} USD</p>,
    },
    {
      title: "Discounted price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <p>{record.price - (record.price * record.discount) / 100} USD</p>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (_, record) => <p>{record.discount}%</p>,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => <p>{record.qty}</p>,
    },
    {
      title: "Status",
      key: "quantity",
      render: (_, record) => (
        <Select
          onChange={(value) => setStatus(value)}
          defaultValue={provinceData[0]}
          style={{
            width: 120,
          }}
          options={provinceData.map((province) => ({
            label: province,
            value: province,
          }))}
        />
      ),
    },
  ];
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        <div className="products">
          <div className="articles">
            <h1>Buyurtmalar</h1>
            <button>
              <NavLink to="/shop/products">Mahsulotlar ro'yxati</NavLink>
            </button>
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
              <div>
                <button>
                  <i className="bx bx-sort-down"></i>
                </button>
                <button>Toifa</button>
                <button>Oxirgi qo'shilganlar</button>
              </div>
            </div>
            <div className="cards">
              <div className="cards_clients">
                {load == true ? (
                  <Spin size="large" />
                ) : (
                  <Table
                    style={{
                      width: "1110px",
                      marginLeft: "30px",
                      marginTop: "-10px",
                    }}
                    columns={ShopCardData()}
                    dataSource={sales}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
