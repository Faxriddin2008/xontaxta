import { useNavigate } from "react-router-dom";
import setState from "./setProducts";
import { Navigate } from "../../CheckingFunctions";
import { message } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function DeleteProduct(keyy, navigate) {
  console.log(keyy);
  message.success("Delete product was succesfully completed!");
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  await deleteDoc(doc(db, `${userEmail}.products`, keyy.keyy));
  // let userData = JSON.parse(localStorage.getItem('userData'))
  // let newUserData = userData.products.filter(item => item.id != keyy)
  // localStorage.setItem('userData', JSON.stringify({...userData, products: newUserData}))
  navigate("/shop/products");
}

export default DeleteProduct;
