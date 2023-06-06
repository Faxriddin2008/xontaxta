import React, { Component, useEffect, useState } from "react";
import Dashboard from "../../shop_pages/Dashboard";
import ShopNavBar from "../../shop_pages/ShopNavBar";
import adidas from "../../../assets/img/adidas.png";
import chair from "../../../assets/img/chair.png";
import { DeleteModal, EditModal, ShowConfirm } from "./Modal";
import DeleteProduct from "./DeleteProduct";
import { useNavigate } from "react-router-dom";
import { getProductsFromFirebase } from "../../firebase/GetProductsFromFirebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Pagination, Spin } from "antd";

import { Navigate } from "../../CheckingFunctions";
// import { getProductsFromFirebase } from "../firebase/GetProductsFromFirebase";
function Details() {
  const locationn = window.location.href;
  // const name = locationn.slice(locationn.search("name="), locationn.search("&img="));
  // const newName = name.slice(5, name.length).replace('%20', ' ')
  // const img = locationn.slice(locationn.search("img="), locationn.search("&price="));
  // const newImg = img.slice(4, img.length)
  // const price = locationn.slice(locationn.search("price="),   locationn.search("&key="));
  // const newPrice = price.slice(6, img.length)
//   const [products, setProducts] = useState([]);
const [open, setOpen] = useState(false);
  
const key = locationn.slice(locationn.search("&key="), locationn.length);
  const keyy = key.slice(5, key.length);
  const [productObject, setProductObject] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  const [load, setLoad] = useState(true)
  useEffect(() => {
    async function getProduct(){
      const docRef = doc(db, `${userEmail}.products`, keyy);
      const docSnap = await getDoc(docRef)
      setProductObject(docSnap.data())
      setLoad(false)
    }
    if(open == false){
      getProduct()
    }else{
      
    }
  }, [open])
//   const productObject = arrr[keyy];
  let navigate = useNavigate();
// console.log(productObject);
  // console.log(newName, newImg, newPrice);
  function showModal() {
    setOpen(true);
  }
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        {load == true ? <Spin size="large"/> :
            productObject == undefined ? "No data found!" : 
            <div className="card">
          <img src={productObject.imgUrl ? productObject.imgUrl : chair} alt="" />
          <div className="about_this_card">
            <div>
              <h1>{productObject.name}</h1>
              <p className="price">{productObject.price}</p>
            </div>
            <p className="definition">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eius
              porro animi nostrum, quo ut ullam enim temporibus blanditiis
              cupiditate possimus cumque maxime voluptate amet aut laborum
              suscipit, exercitationem nisi!
            </p>
            <div style={{ marginLeft: -10 + "px" }}>
              <div className="color_and_quantity">
                <p>Rangi</p>
                <span></span>
              </div>
              <div className="color_and_quantity">
                <p>Supplier</p>
                <span>
                  <img src={adidas} alt="" />
                </span>
              </div>
            </div>
            <div className="quantity">
              <p>Miqdor</p>
              <div>
                <button>1000</button>
                <button>2000</button>
                <button>3000</button>
                <button>4000</button>
                <button>5000</button>
                <button>6000</button>
              </div>
            </div>
            <i>
            <DeleteModal keyy={keyy} ></DeleteModal>

            </i>
            {/* <i
              className="bx bx-x-circle"
              onClick={() => DeleteProduct(keyy, navigate)}
            ></i> */}
            <EditModal
              open={open}
              keyyy={keyy}
              data={productObject}
              showModal={showModal}
              setOpen={setOpen}
            />

            {/* <i onClick={showModal} className='bx bx-edit' style={{fontSize: 30 + 'px', marginLeft: 550 + 'px',marginTop: 15 + 'px', position: 'absolute'}}></i> */}
            <button className="buy">Sotib olish</button>
          </div>
        </div>
        }
        {/* <button onClick={() => navigate(-1)}>Qaytish</button> */}
      </div>
    </div>
  );
}

export default Details;
