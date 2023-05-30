import React, { Component, useEffect, useRef, useState } from "react";
import NavBar from "../main_pages/NavBar";
import { initial_values } from "../../auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { handleClick } from "../CheckingFunctions";
import { SetNewUser } from "../firebase/SetNewUser";
import { message } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getUsersFromFirebase } from "../firebase/GetUsers";
import { toast } from "react-toastify";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  let navigate = useNavigate();
  // useEffect(() => {
  //   handleClick(navigate);
  // }, [localStorage.getItem("userData")]);

  const nameRef = useRef(initial_values.userData.name);
  const emailRef = useRef(initial_values.userData.email);
  const passwordRef = useRef(initial_values.userData.password);
  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   async function getUserss() {
  //     const allUsers = await getUsersFromFirebase();
  //     setUsers(allUsers);
  //     // console.log(allUsers);
  //   }
  //   getUserss();
  // }, []);
  // console.log(users);
  
  function Refs() {
    // const [currUser, setCurrUser] = useState("")
    const userData = initial_values.userData;
    // let newDate = new Date().getTime() + 86400000;
    var newUserData = {
      ...userData,
      tokenExpiredDate: new Date().getTime() + 86400000,
      userName: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      token: true,
    };
    if (
      nameRef.current.value == "" ||
      emailRef.current.value == "" ||
      passwordRef.current.value == "" ||
      passwordRef.current.value.length < 8
    ) {
      message.warning("Something went wrong!");
    } else {
      createNewUser(newUserData);

      // if (filteredUsers == []) {
      //   console.log(filteredUsers);
      //   console.log("tiiiiiiiyt");
      //   // message.warning("Something went wrong!")
      //   toast.warning("Hellooooouuuuuuu");
      // } else {
      
      // }
    }
    function createNewUser(userData) {
      const { email, password } = userData;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          SetNewUser({...newUserData, id: user.uid});

          // Signed in
          // ...
          console.log(user.uid);
          localStorage.setItem("user", JSON.stringify({...newUserData, id: user.uid}));
          navigate("/shop");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          message.warning(`Bunday akkount mavjud!`)

          // ..
        });
    }

    // const [name, setName] = useState(nameRef);
    // const [email, setEmail] = useState(emailRef);
    // const [password, setPassword] = useState(passwordRef);
    // localStorage.setItem('userData', JSON.stringify(newUserData))
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h1> Ro'yxatdan o'tish </h1>

          <fieldset>
            <label for="name">Ism:</label>
            <input ref={nameRef} type="text" id="name" name="user_name" />
            <label for="email">Email:</label>
            <input type="email" ref={emailRef} id="mail" name="user_email" />
            <label for="password">Parol:</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              name="user_password"
            />
            <p>Allready have an account? <Link to={"/signin"}>Sign In</Link></p>
          </fieldset>
          <button type="submit" onClick={Refs} className="signup">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
