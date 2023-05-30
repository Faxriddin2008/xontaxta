import React, { Component, useContext, useEffect, useState } from 'react';
import profile_photo from "../../assets/img/profile_photo.jpg"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { handleClick } from '../CheckingFunctions';
import { Content } from 'antd/es/layout/layout';
import { Context } from '../..';
import InBasket from '../shop_pages/Product_Pages/InBasket';
function ShopNavBar() {
    let userData = localStorage.getItem('userData')
    // let context = useContext(Context)
    // console.log(context);

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
                    <i className='bx bx-basket'></i>
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