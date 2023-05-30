import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ShopNavBar from "./ShopNavBar";
import { handleClick } from "../CheckingFunctions";
import { Content } from "antd/es/layout/layout";
import { Context } from "../..";
import { toast } from "react-toastify";
import { message } from "antd";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { storage } from "../firebase";

function ShopPage() {
  let navigate = useNavigate();
  useEffect(() => {
    handleClick(navigate);
  }, []);
  const [imgUrl, setImgUrl] = useState("");
  // const [url, setUrl] = useState('')
  const imgRef = useRef(null);
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  // const upload = (file) => {
  //   if(imgUrl == null)
  //   return;
  //   setUrl("Getting Url Link...")
  //   const imgRef = ref(storage, `images/giphy.gif`);
  //   console.log(imgRef._location.path_);
  // }
  
  // Create a storage reference from our storage service
  // const storageRef = ref(storage);
  // const url = localStorage.getItem('imgUrl')
  // console.log(url);
  return (
    <div className="shop-page">
      <div>
        <Dashboard />
      </div>
      <div>
        <ShopNavBar />
        
      </div>
    </div>
  );
}

export default ShopPage;
