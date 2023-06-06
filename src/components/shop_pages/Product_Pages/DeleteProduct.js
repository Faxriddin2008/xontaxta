import { useNavigate } from "react-router-dom";
import setState from "./setProducts";
import { Navigate } from "../../CheckingFunctions";
import { message } from "antd";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

async function DeleteProduct(keyy, navigate) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  console.log(keyy);
  const docc = await getDoc(doc(db, `${userEmail}.products`, keyy.keyy))
  const imgRef =  ref(storage, docc.data().img);
  await deleteObject(imgRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  message.success("Delete product was succesfully completed!");

  await deleteDoc(doc(db, `${userEmail}.products`, keyy.keyy));
  // let userData = JSON.parse(localStorage.getItem('userData'))
  // let newUserData = userData.products.filter(item => item.id != keyy)
  // localStorage.setItem('userData', JSON.stringify({...userData, products: newUserData}))
  navigate("/shop/products");
}

export default DeleteProduct;
