import { useNavigate } from "react-router-dom";
import setState from "./setProducts";
import { Navigate } from "../../CheckingFunctions";
import { message } from "antd";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function DeleteProduct(keyy, navigate) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  console.log(keyy);
  const docc = await getDoc(doc(db, `${userEmail}.products`, keyy.keyy))
  console.log(docc.data().img);
  message.success("Delete product was succesfully completed!");

  await deleteDoc(doc(db, `${userEmail}.products`, keyy.keyy));
  // let userData = JSON.parse(localStorage.getItem('userData'))
  // let newUserData = userData.products.filter(item => item.id != keyy)
  // localStorage.setItem('userData', JSON.stringify({...userData, products: newUserData}))
  navigate("/shop/products");
}

export default DeleteProduct;
