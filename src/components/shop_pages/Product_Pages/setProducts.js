import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { message } from "antd";
import { Navigate } from "../../CheckingFunctions";

export async function setState(values) {
    const {name, price, discount, qty, imgUrl, img, rating} = values;
    console.log(values, "values");
    const user = JSON.parse(localStorage.getItem("user"))
    const userEmail = user ? user.email : Navigate("/signup") 
    try {
        const docRef = await addDoc(collection(db, `${userEmail}.products`), {
          name: name,
          price: price,
          discount: discount,
          quantity: qty,
          img: img,
          imgUrl: imgUrl,
          rating: rating,
          time: new Date().getTime(),
        });
        // console.log("Document written with ID: ", docRef.id);
        message.success("Create product was successfully completed!")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}




    // const userData = JSON.parse(localStorage.getItem('userData'))
    // const products = JSON.parse(localStorage.getItem('userData')).products;
    // console.log(products);
    // localStorage.setItem('userData', JSON.stringify({...userData, products: [...products,{...values, id: new Date().getTime()}]}))
    // // localStorage.setItem('userData', ...userData, products =  [JSON.stringify(values)])


export default setState;