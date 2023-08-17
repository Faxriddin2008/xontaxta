import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { Checkbox, Form, Input } from "antd";
import InputMask from 'react-input-mask';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddModal = ({setShunchaki}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function addClients(values){
    const {address, email, username, phone} = values;
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        username: username,
        email: email,
        phone: phone,
        address: address,
      });
      message.success("Create client was successfully completed!")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setShunchaki(isModalOpen)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    addClients(values)
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    handleCancel();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3524/3524388.png"
          width={"15px"}
          height={"15px"}
          alt=""
        />{" "}
        Add Client
      </Button>
      <Modal
        footer=""
        title="Add Client"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input allowClear/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <InputMask
              mask="+998 (99) 999-99-99"
              maskChar={null}  
              // type="tel"
              
              className="ant-input css-dev-only-do-not-override-htwhyh"
              // permanents={[0, 1]}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input allowClear/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
