// import { Button, Modal } from 'antd';
import { useEffect, useState } from "react";
import { InputMaskOptions } from "antd-mask-input/build/main/lib/MaskedInput";
import React from "react";
import setState from "./setProducts";
import chair from "../../../assets/img/chair.png";
import isModalVisible from "../../CheckingFunctions/CheckModalOpen";
import { Button, Modal, Checkbox, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { StarOutlined } from "antd"
import EditProduct from "./EditProduct";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
import DeleteProduct from "./DeleteProduct";
import { Navigate } from "../../CheckingFunctions";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
export default function AddModal() {
  let navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  // setSelectedImageUrl("")
  // setSelectedImage("")
  function imgUploader(file) {
    console.log(file[0].name);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file[0].name}`);
  
    uploadBytes(storageRef, file[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      // downloader()

    });
  }
  useEffect(() => {
    downloader()
  }, [selectedImage])
  function downloader(params) {
    const storage = getStorage();
    console.log(selectedImage);
    return getDownloadURL(ref(storage,  `images/${selectedImage}`))
      .then((url) => {
        console.log(url);
        setSelectedImageUrl(url)
      })
      .catch((error) => {
        // Handle any errors
      });
  }
  const onFinish = (values) => {
    console.log(selectedImageUrl);
    // console.log("Success:", values);
    if (navigator.onLine) {
      setState({
        ...values,
        price: +values.price,
        imgUrl: selectedImageUrl  != "" ? selectedImageUrl : "",
        img: `images/${selectedImage}`
      });
      // setIsModalOpen(false);
      navigate("/shop/products");
    } else {
      message.warning("Please check your network connection!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log("Success:", values);

    // setIsModalOpen(false);
  };
  const onChange = (e) => {
    console.log(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/shop/products')
  };
  isModalVisible({ isModalOpen });
  // console.log(selectedImage);
  return (
    <div className="modal_wrapper">
      {/* <Modal title="Add product" onCancel={handleCancel} open={isModalOpen}> */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product name"
          name="name"
          allowClear
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <Input allowClear type="number" addonAfter="USD"/>
        </Form.Item>

        <Form.Item
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input discount!",
            },
          ]}
        >
          <Input allowClear type="number" addonAfter="%" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="qty"
          rules={[
            {
              required: true,
              message: "Please input quantity!",
            },
          ]}
        >
          <Input allowClear type="number" />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            {
              required: true,
              message: "Please input rating!",
            },
          ]}
        >
          <Input allowClear type="number" addonAfter={<i className="bx bx-star"></i>}/>
        </Form.Item>
        {/* <Form.Item> */}
        <Form.Item>
        <input
          type="file"
          onChange={(event) => {
            imgUploader(event.target.files)
            setSelectedImage(event.target.files[0].name);
          }}
        />
        </Form.Item>
        {/* <button onClick={downloader}>OK</button> */}
        {/* </Form.Item> */}
        
        <Form.Item
        className="addproduct_buttons"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onFinish={onFinish}
            onOk={handleOk}
            // style={{marginLeft: "80px", position: 'absolute'}}

            onFinishFailed={onFinishFailed}
          >
            Create
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            // style={{marginLeft: "-60px", position: 'absolute'}}
            onClick={() => navigate("/shop/products")}
            
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>

      {/* </Modal> */}
    </div>
  );
}

export  function EditModal({ open, setOpen, data, showModal, keyyy }) {
  const [state, setState] = useState({});
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const { name, price, discount, qty, rating } = data;
  let navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  const productRef = doc(db, `${userEmail}.products`, keyyy);
  
  useEffect(() => {
    async function get(){
      const product = await getDoc(productRef)
      setProduct(product.data())
    }
    get()
  }, [])
  // console.log(product);
  function onFinish(values) {
    EditProduct({ ...values, key: keyyy, img: selectedImage ? selectedImage : product.img, imgUrl: selectedImage ? selectedImageUrl : product.imgUrl});

    // products[key] = values;
    handleOk();
  }

  const handleOk = (values) => {
    // console.log(values);
    // setState(values)
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  function imgUploader(file) {
    console.log(file[0].name);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file[0].name}`);
  
    uploadBytes(storageRef, file[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      // downloader()

    });
  }
  useEffect(() => {
    downloader()
  }, [selectedImage])
  function downloader(params) {
    const storage = getStorage();
    console.log(selectedImage);
    return getDownloadURL(ref(storage,  `images/${selectedImage}`))
      .then((url) => {
        console.log(url);
        setSelectedImageUrl(url)
      })
      .catch((error) => {
        // Handle any errors
      });
  }
  return (
    <>
      
        <i onClick={() => setOpen(true)} style={{cursor: "pointer"}} className="bx bx-edit"></i> 
        
      
      {/* <p>Edit</p> */}
      <Modal
        title="Edit product"
        open={open}
        onOk={handleOk}
        footer={""}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            name: product.name,
            price: product.price,
            discount: product.discount,
            qty: product.quantity,
            rating: product.rating,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Product name"
            name="name"
            allowClear
            
            rules={[
              {
                required: false,
                message: "Please input product name!",
              },
            ]}
          >
            <Input  allowClear />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: false,
                message: "Please input price!",
              },
            ]}
          >
            <Input allowClear  />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: false,
                message: "Please input discount!",
              },
            ]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="qty"
            rules={[
              {
                required: false,
                message: "Please input quantity!",
              },
            ]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: false,
                message: "Please input rating!",
              },
            ]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item>
        <input
          type="file"
          onChange={(event) => {
            imgUploader(event.target.files)
            setSelectedImage(event.target.files[0].name);
          }}
        />
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"  onFinish={onFinish}>
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const { confirm } = Modal;
export const DeleteModal = (keyy) => {
  let navigate = useNavigate()
  const ShowConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
        DeleteProduct(keyy,navigate)
        // navigate("/shop/products")
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    
      <Button className="delete_modal_wrapper" onClick={ShowConfirm}>
        <i
          className="bx bx-x-circle"
        ></i>
        Delete product
      </Button>
  
  );
};
