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
import { getOrder } from "../getOrder";
function InBasket() {
  const [load, setLoad] = useState(true);
  const [shunchaki, setShunchaki] = useState(0);
  const [basket, setBasket] = useState([]);
  const [order, setOrder] = useState([]);
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
      title: "Product img",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <p >
          <img src={record.img} className="inbasket_img" alt="" />
        </p>
      ),
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <p>

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
          {record.qty == 0 ? "" :
          <CloseOutlined onClick={() => remove(record.id, record.idd)}/>
          }    
        </div>
      ),
    },
    {
      title: "Placing an order",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <div>
          {record.qty == 0 ? "" :
          <img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" style={{cursor: "pointer"}} width={"30px"} height={"30px"} onClick={() => buy(record.id , record)} alt="" />
          }
          </div>
      ),
    },
  ];
  async function minusHandler(id, idd) {
    setLoad(true)
    // console.log(id);
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonRef = doc(db, `${userEmail}.basket`, id);
    const product = await getDoc(washingtonRef);
    const qty = product.data().qty
    // console.log(product.data());
    // Set the "capital" field of the city 'DC'
    if(qty != 0){

//       const filter =  p.filter(item => item.id == idd)

// if(filter.length == 0){
//  addDoc
// }else{
//   updateDoc
// }
      await updateDoc(washingtonRef, {
        qty:  qty  - 1,
      });
      
    

    // const user = JSON.parse(localStorage.getItem("user"));
    // const userEmail = user ? user.email : Navigate("/signup");
    const washingtonReff = doc(db, `${userEmail}.products`, idd);
    const productt = await getDoc(washingtonReff);
    const qtyy = productt.data().quantity
    // console.log(productt.data());
    // Set the "capital" field of the city 'DC'
    
      await updateDoc(washingtonReff, {
        quantity:  qtyy  + 1,
      });
      // console.log();
    }else{

    }
    setShunchaki(new Date().getTime())
    setLoad(false)
  }
  async function plusHandler(id, idd) {
    setLoad(true)
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonRef = doc(db, `${userEmail}.basket`, id);
    const product = await getDoc(washingtonRef);
    const qty = product.data().qty
    const washingtonReff = doc(db, `${userEmail}.products`, idd);
    const productt = await getDoc(washingtonReff);
    const qtyy = productt.data().quantity
    console.log(productt.data());
      if(qtyy != 0){
        await updateDoc(washingtonRef, {
          qty:  qty  + 1,
        });

      
        await updateDoc(washingtonReff, {
          quantity:  qtyy  - 1,
        });

      
      setShunchaki(new Date().getTime())
  
      }else{
        
      }
      setLoad(false)
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
    setShunchaki(new Date().getTime())
  }
  useEffect(() => {
    async function get() {
      const saless = await getOrder();
      setOrder(saless);
    
    }
    get();
    
  }, []);

  async function buy(id,record){
    setLoad(true)
    const {name, price, qty, img, idd, discount} = record;
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");

    // const filter = order.filter(item => item.idd == id)

    let now = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
    const filter = order.filter(item => item.idd == idd)
    console.log(filter);

    if(filter.length == 0){

      try {
        const docRef = await addDoc(collection(db, `${userEmail}.order`), {
          name: name,
          price: price,
          discount: discount,
          qty: qty,
          img: img,
          idd: idd,
          date: now,
          status: "Kutilmoqda"
        });
        // console.log("Document written with ID: ", docRef.id);
        // message.success("Create product was successfully completed!")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  
      await deleteDoc(doc(db, `${userEmail}.basket`, id))
      setShunchaki(new Date().getTime())
    }else{
      await updateDoc(doc(db, `${userEmail}.order`, filter[0].id), {
        qty: filter[0].qty + qty,
      })
      await deleteDoc(doc(db, `${userEmail}.basket`, id))
      setShunchaki(new Date().getTime())
    }
    
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
                <Table style={{width: "1120px", marginLeft: "-10px"}} columns={ShopCardData()} dataSource={basket} />
              )}  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InBasket;

// const filter =  products.filter(item => item.id == idd)

// if(filter.length == 0){
 // addDoc
//}else{
  // updateDoc
//}
