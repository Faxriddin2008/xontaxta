import React, { Component, useContext, useEffect, useState } from 'react';
import profile_photo from "../../assets/img/profile_photo.jpg"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { handleClick } from '../CheckingFunctions';
import { Content } from 'antd/es/layout/layout';
import { Context } from '../..';
import InBasket from '../shop_pages/Product_Pages/InBasket';
import { getBasketProductsFromFirebase } from './getBasket';
import { Spin } from 'antd';
function ShopNavBar() {
    let userData = localStorage.getItem('userData')
    // let context = useContext(Context)
    const [basket, setBasket] = useState([])
    const [load, setLoad] = useState(true)
    // console.log(context);
    useEffect(() => {
        async function get() {
          const products = await getBasketProductsFromFirebase();
          setBasket(products);
        }
        get();
        setLoad(false)
      }, [load]);
    return ( 
        <div>
            <div className='shop-navbar'>
            <div>
                <input type="text" className={`inp-search`} placeholder="🔍 Qidirish" name="" id="" />
            </div>
            <div className={`icons_wrapper`}>
                <i className='bx bx-moon'></i>
                <i className='bx bx-notification'></i>
                <Link to={'/inbasket'}>
                    <i style={{color: "black", marginTop: "7px"}} className='bx bx-basket'></i>
                    <sub style={{color: "black"}}>{basket.length}</sub>
                </Link>
                <Link to="/profile">
                    <img src={profile_photo} className='profile-photo' alt="" />

                </Link>
                <Link to="/signup" ><i className='bx bx-power-off'></i> Chiqish</Link>
            </div>
        </div>

        </div>
);
}

export default ShopNavBar;