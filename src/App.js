import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/main_pages/HomePage';
import NotFound from './components/main_pages/NotFound';
import SignUp from './components/sign_pages/SignUp';
import SignIn from './components/sign_pages/SignIn';
import About from './components/main_pages/About';
import Contact from './components/main_pages/Contact';
import ShopPage from './components/shop_pages/ShopPage';
import Dashboard from './components/shop_pages/Dashboard';
import Products from './components/shop_pages/Product_Pages/Products';
import landing_photo4 from "./assets/img/landing_photo4.png"
import { initial_values } from './auth';
import Details from './components/shop_pages/Product_Pages/Details';
import Sales from './components/shop_pages/Sales';
import AddModal from './components/shop_pages/Product_Pages/Modal';
import Profile from './components/shop_pages/Profile';
import InBasket from './components/shop_pages/Product_Pages/InBasket';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { message } from 'antd';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate()
  let top_picks = [
    {
      img: landing_photo4,
      name: 'Trenton modular sofa_3',
      price: "Rs. 25,000.00"
    },
    {
      img: landing_photo4,
      name: 'Trenton modular sofa_3',
      price: "Rs. 25,000.00"
    },
    {
      img: landing_photo4,
      name: 'Trenton modular sofa_3',
      price: "Rs. 25,000.00"
    },
    {
      img: landing_photo4,
      name: 'Trenton modular sofa_3',
      price: "Rs. 25,000.00"
    },
  ]
  const auth = getAuth();
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    // console.log(auth.currentUser.uid);
  
    if (user.email) {
      // console.log(user.metadata);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const email = user.email;
      // console.log(email);
      // ...
    } else {
      navigate("/signup")
      // message.error("eeeyyy qo'yeee")
      // User is signed out
      // ...
    }
  })
}, [])
  return (
    
    <div className="App">
        <Routes>
          <Route exact path='/' element={<HomePage top_picks={top_picks}/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/signup' element={<SignUp/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/signin' element={<SignIn/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop' element={<ShopPage/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop/dashboard' element={<ShopPage/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop/details' element={<Details/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop/products' element={<Products/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop/sales' element={<Sales/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/about' element={<About/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/contact' element={<Contact/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/inbasket' element={<InBasket/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/profile' element={<Profile/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/shop/create_shop' element={<AddModal/>} errorElement={<NotFound/>}></Route>
          <Route exact path='/*' element={<NotFound/>} errorElement={<NotFound/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
