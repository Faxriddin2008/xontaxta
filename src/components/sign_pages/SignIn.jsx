import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import { useContext, useRef } from "react";
import { Context } from "../..";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

import { toast } from "react-toastify";
import { initial_values } from "../../auth";

const SignIn = () => {
  
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  let navigate = useNavigate();
  function setNewItem(values) {
    const {email, password} = values;

    const userData = initial_values.userData;

    var newUserData = {
      ...userData,
      tokenExpiredDate: new Date().getTime() + 86400000,
      email: email,
      password: password,
      token: true,
    };
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        message.success("Sign in successfully completed!");
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(newUserData));

        navigate('/shop')

        // ...
      })
      .catch((error) => {
        toast.warning("Bunaqa akkount mavjud emas!")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    // let userData = JSON.parse(localStorage.getItem('user'))
    // console.log(userData.tokenExpiredDate);
    // let tokenExpiredDate = new Date().getTime() + 86400000;
    // console.log(tokenExpiredDate);
    // localStorage.setItem('userData', JSON.stringify({...userData, tokenExpiredDate: tokenExpiredDate}))
  }
  return (
    <div className="form_signin centered">
      <Form
        name="basic"
        
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="centered"
        onFinish={setNewItem}
        
        style={{ flexDirection: "column", margin: "auto" }}
        initialValues={{ remember: true }}
        
        autoComplete="off"
      >
        <div className="signin_form">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/1698/1698771.png"}
            alt=""
            width="200px"
            height={"100px"}
            style={{ marginBottom: 20 + "px", objectFit: "cover" }}
          />

          
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input ref={emailRef} prefix={<MailOutlined className="site-form-item-icon" />} allowClear />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password ref={passwordRef} allowClear prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
