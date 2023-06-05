import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import chair from "../../../assets/img/chair.png";
import setSales from "../getSales";
import { Modal } from "antd";
import AddModal from "./Modal";
import SetBasket from "../getSales";
import { getBasketProductsFromFirebase } from "../../shop_pages/getBasket";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate } from "../../CheckingFunctions";
function Product({ name, rating, qty, discount, keyy, img, price, withadd }) {
  const [products, setProducts] = useState();
  const [shunchaki, setShunchaki] = useState();
  const [basket, setBasket] = useState([]);
  const [qtyy, setQtyy] = useState(1);

//   console.log(qty);
  useEffect(() => {
    async function get() {
      const productss = await getBasketProductsFromFirebase();
      setBasket(productss);
    }
    get();
  }, [shunchaki]);

  async function SetBasket(values) {
    // const washingtonReff = doc(db, `${userEmail}.products`, keyy);
    //     const productt = await getDoc(washingtonReff);
    //     const qtyyy = productt.data().quantity;
    const { name, rating, qtyy, discount, keyy, img, price } = values;
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : Navigate("/signup");
    const washingtonReff = doc(db, `${userEmail}.products`, keyy);
    const productt = await getDoc(washingtonReff);
    const qtyyy = productt.data().quantity;
    console.log(productt.data());
    // const filtered = basket.filter(item => item.name == "Stul")
    // console.log(filtered);
    // console.log(values);
    

    // const basket = await getBasketProductsFromFirebase()
    // console.log(basket);
    //   console.log(basket);
    console.log(basket);
    const filter = basket.filter((item) => item.idd == keyy)[0];
    console.log(filter);
    let now = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
    if (!filter || !basket) {
      try {
        const docRef = await addDoc(collection(db, `${userEmail}.basket`), {
          name: name,
          price: price,
          discount: discount,
          qty: qtyy,
          img: img,
          idd: keyy,
          date: now,
        });
        // console.log("Document written with ID: ", docRef.id);
        // message.success("Create product was successfully completed!")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setShunchaki(1);
      console.log("1");
    //   const user = JSON.parse(localStorage.getItem("user"));
    // const userEmail = user ? user.email : Navigate("/signup");
    
    // Set the "capital" field of the city 'DC'
    
      await updateDoc(washingtonReff, {
        quantity:  +qtyyy  - 1,
      });
      // console.log();
    
    } else {
        
    
        if(qtyyy != 0){ 

        const washingtonRef = doc(db, `${userEmail}.basket`, filter.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        qty: filter.qty + 1,
      });
      console.log("2");
      setShunchaki(qtyyy)


    console.log(productt.data());
    // Set the "capital" field of the city 'DC'
    
      await updateDoc(washingtonReff, {
        quantity:  qtyyy  - 1,
      })}else {
        
      }
      // console.log();
    }
    // console.log(keyy);
  }

  // console.log(basket);
  function setToBasket() {
    SetBasket({
      name,
      rating,
      qtyy,
      discount,
      keyy,
      img,
      price,
      products,
      setProducts,
      basket,
      setBasket,
    });
    setQtyy(qtyy + 1);
  }
  // console.log(img, price);
  return (
    <div className="product_chair" key={keyy}>
      {discount ? <p>{discount}</p> : ""}
      <NavLink
        to={withadd == true ? `/shop/details?&key=${keyy}` : ""}
        style={{ textDecoration: "none" }}
      >
        <img src={img} alt="" />
      </NavLink>

      <div>
        <h2>
          {rating} <i className="bx bx-star"></i>
        </h2>

        <div>
          <h1>{name}</h1>
          <h3>{price}</h3>
        </div>

        {withadd == true ? (
          <button onClick={setToBasket}>+</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Product;
