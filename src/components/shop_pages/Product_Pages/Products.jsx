import React, { Component, useEffect, useRef, useState } from "react";
import ShopPage from "../../shop_pages/ShopPage";
import Dashboard from "../../shop_pages/Dashboard";
import ShopNavBar from "../../shop_pages/ShopNavBar";
import chair from "../../../assets/img/chair.png";
import Product from "./Product";
import AddModal from "./Modal";
import NotFoundd from "../../../assets/img/NotFound.jpg"

// import Spin from "antd"
import isModalVisible from "../../CheckingFunctions/CheckModalOpen";
import { Button, Pagination, Spin } from "antd";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Select } from "antd";

import {
  GetProductsFromFirebase,
  getProductsFromFirebase,
} from "../../firebase/GetProductsFromFirebase";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import NotFound from "../../main_pages/NotFound";
// const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const provinceData = ["All", "Stol", "Kreslo", "Devan", "Shkaf", "Xontaxta"];
function Products() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [arrr, setArrr] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [load, setLoad] = useState(true);
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
      setFilteredProducts(products)
      setLoad(false)
    }
    getProducts();
  }, []);
  // const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

  function filterHandler(key) {
    // setArrr(arrr)
    console.log(key);
      if(key != "All"){
      const productFilter = filteredProducts.filter((item) => item.name.toLowerCase() === key.toLowerCase());
      setArrr(productFilter);
      console.log(productFilter);
      }else{
        setArrr(filteredProducts)
      }
  }
  // console.log(arrr);
  const [state, setState] = useState(localStorage);
  // const [modalVisible, setModalVisible] = useState(isModalVisible)

  const inputRef = useRef(null);
  function search() {
    const newArr = filteredProducts.filter((item) =>
      item.name.toLowerCase().includes(inputRef.current.value.toLowerCase())
    );
    setArrr(newArr);
  }
  const [pageee, setPageee] = useState(1);
    // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  // console.log(arrr[2]);
  let navigate = useNavigate();
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        <Button type="primary" className="modal_button">
          <NavLink to={`/shop/create_shop`}>Qo'shish</NavLink>
        </Button>
        {/* <AddModal/> */}
        <div className="products">
          <div className="articles">
            <h1>Mahsulotlar</h1>
            {/* <button>Mahsulot qo'shish</button> */}
          </div>
          <div className="products_wrapper">
            <div className="filters">
              <input
                type="search"
                className="search"
                placeholder="🔍 Qidirish"
                ref={inputRef}
                onChange={search}
                name=""
                id=""
              />
              <div>
                <Pagination
                  defaultCurrent={1}
                  total={arrr.length}
                  pageSize={8}
                  onChange={(page, size) => setPageee(page)}
                  style={{ position: "absolute", marginLeft: -500 + "px" }}
                />
                <button>
                  <i className="bx bx-sort-down"></i>
                </button>
                {/* <button> */}
                  <Select
                    onChange={(value) => filterHandler(value)}
                    defaultValue={provinceData[0]}
                    style={{
                      width: 120,
                    }}
                    options={provinceData.map((province) => ({
                      label: province,
                      value: province,
                    }))}
                  />
                {/* </button> */}
                <button>Oxirgi qo'shilganlar</button>
              </div>
            </div>
            {load == false ? 
            <div className="cards">
              { arrr.length != 0
                ? arrr.map((item, i) => (
                    <Product
                      name={item.name}
                      keyy={item.id}
                      price={item.price}
                      img={item.img  ? item.img : chair }
                      discount={item.discount}
                      rating={item.rating}
                      qty={item.quantity}
                      withadd={true}
                    />
                  ))
                : "No products" }
            </div>
            : <Spin  size="large"/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
