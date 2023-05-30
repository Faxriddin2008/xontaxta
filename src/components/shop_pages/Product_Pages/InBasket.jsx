import React, { Component, useEffect, useRef, useState } from "react";
import Dashboard from "../../shop_pages/Dashboard";
import ShopNavBar from "../../shop_pages/ShopNavBar";
import { NavLink } from "react-router-dom";
import { Space, Spin, Table, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getBasketProductsFromFirebase } from "../../shop_pages/getBasket";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate } from "../../CheckingFunctions";
function InBasket() {
  const [load, setLoad] = useState(true);
  const [shunchaki, setShunchaki] = useState(0);
  const [basket, setBasket] = useState([]);
  const inputRef = useRef(null);
  function search() {}
  useEffect(() => {
    async function get() {
      const products = await getBasketProductsFromFirebase();
      setBasket(products);
      setLoad(false);
    }
    get();
  }, [shunchaki]);
  // console.log(basket);

  const ShopCardData = () => [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <p className="basket_item_wrapper">
          <img src={record.img} className="inbasket_img" alt="" />

          {record.name}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "orginalPrice",
      key: "price",
      render: (_, record) => <p>{+record.price + " USD"}</p>,
    },
    {
      title: "Add",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div
          className="btn_quanty"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button onClick={() => minusHandler(record.id, record.idd)}>-</Button>
          <p>{record?.qty}</p>
          <Button onClick={() => plusHandler(record.id, record.idd)}>+</Button>
        </div>
      ),
    },
    {
      title: "Total Price",
      key: "quantity",
      render: (_, record) => (
        <p>
          {(+record.price - (+record.price * 5) / 100) * +record.qty + " USD"}
        </p>
      ),
    },
    {
      title: "Sana",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Remove",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <div>
          <CloseOutlined onClick={() => remove(record.id, record.idd)}/>
        </div>
      ),
    },
    {
      title: "Buy",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <div>
          <img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" width={"30px"} height={"30px"} onClick={() => buy(record.id , record)} alt="" />
        </div>
      ),
    },
  ];
  async function minusHandler(id, idd) {
    // console.log(id);
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonRef = doc(db, `${userEmail}.basket`, id);
    const product = await getDoc(washingtonRef);
    const qty = product.data().qty
    // console.log(product.data());
    // Set the "capital" field of the city 'DC'
    if(qty != 0){
      await updateDoc(washingtonRef, {
        qty:  qty  - 1,
      });
      
    

    // const user = JSON.parse(localStorage.getItem("user"));
    // const userEmail = user ? user.email : Navigate("/signup");
    const washingtonReff = doc(db, `${userEmail}.products`, idd);
    const productt = await getDoc(washingtonReff);
    const qtyy = productt.data().quantity
    console.log(productt.data());
    // Set the "capital" field of the city 'DC'
    
      await updateDoc(washingtonReff, {
        quantity:  qtyy  + 1,
      });
      // console.log();
    }else{

    }
    setShunchaki(qty)

  }
  async function plusHandler(id, idd) {
    
    // console.log(id);
    // const user = JSON.parse(localStorage.getItem("user"));
    // const userEmail = user ? user.email : Navigate("/signup");
    // const washingtonRef = doc(db, `${userEmail}.basket`, id);
    // const product = await getDoc(washingtonRef);
    // const qty = product.data().qty
    // // console.log(product.data());
    // // Set the "capital" field of the city 'DC'
    
    //   await updateDoc(washingtonRef, {
    //     qty:  qty  + 1,
    //   });
    

    
    // setShunchaki(qty)

    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonRef = doc(db, `${userEmail}.basket`, id);
    const product = await getDoc(washingtonRef);
    const qty = product.data().qty
    const washingtonReff = doc(db, `${userEmail}.products`, idd);
    const productt = await getDoc(washingtonReff);
    const qtyy = productt.data().quantity
    console.log(productt.data());
    // console.log(product.data());
    // Set the "capital" field of the city 'DC'
    
      if(qtyy != 0){
        await updateDoc(washingtonRef, {
          qty:  qty  + 1,
        });
      
        // if(qtyy - 1 == 0){
        //   await deleteDoc(washingtonReff)
        // }else{
  
        // }
      // const user = JSON.parse(localStorage.getItem("user"));
      // const userEmail = user ? user.email : Navigate("/signup");
      
      // Set the "capital" field of the city 'DC'
      
        await updateDoc(washingtonReff, {
          quantity:  qtyy  - 1,
        });
        // console.log();
      
      setShunchaki(qty)
  
      }else{
        
      }
  }
  async function remove(id, idd){
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonRef = doc(db, `${userEmail}.basket`, id);
    const product = await getDoc(washingtonRef);
    const qty = product.data().qty
    const washingtonReff = doc(db, `${userEmail}.products`, idd);
    const productt = await getDoc(washingtonReff);
    const qtyy = productt.data().quantity
    console.log(productt.data().quantity, product.data().qty);
    await deleteDoc(washingtonRef)
    await updateDoc(washingtonReff, {
      quantity: productt.data().quantity + product.data().qty,      
    })
    setShunchaki(qty)
  }
  async function buy(id,record){
    const {name, price, qty, img, idd, discount} = record;
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");

    let now = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`

    try {
      const docRef = await addDoc(collection(db, `${userEmail}.sales`), {
        name: name,
        price: price,
        discount: discount,
        qty: qty,
        img: img,
        idd: idd,
        date: now,
      });
      // console.log("Document written with ID: ", docRef.id);
      // message.success("Create product was successfully completed!")
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    await deleteDoc(doc(db, `${userEmail}.basket`, id))
    setShunchaki(qty)
  }
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        <div className="products">
          <div className="articles">
            <h1>Savatcha</h1>
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
                onKeyUp={search}
                name=""
                id=""
              />
            </div>
            <div className="cards">
              {load == true ? (
                <Spin size="large" />
              ) : (
                <Table columns={ShopCardData()} dataSource={basket} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InBasket;
