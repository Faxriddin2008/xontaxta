import { doc, updateDoc } from "firebase/firestore";
import { Navigate } from "../../CheckingFunctions";
import { db } from "../../firebase";

async function EditProduct(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  const { name, price, qty, discount, img, imgUrl } = data;
  const product = doc(db, `${userEmail}.products`, data.key);
  await updateDoc(product, {
    name: name,
    price: price,
    quantity: qty,
    discount: discount,
    img: img,
    imgUrl: imgUrl,
  });
  
  // let userData = JSON.parse(localStorage.getItem('userData'));
  // if(!userData.products){
  //     userData.products = [];
  //     localStorage.setItem('userData', JSON.stringify(userData))
  // }
  // userData = JSON.parse(localStorage.getItem('userData'));
  // userData.products[data.key] = data;
  // localStorage.setItem('userData', JSON.stringify(userData));
}

export default EditProduct;
