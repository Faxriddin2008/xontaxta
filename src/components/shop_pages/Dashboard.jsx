import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/img/logo.jpg"
 function Dashboard() {
    return ( 
        <div className='dashboard'>
            <div>
               <ul>
                  <h1><NavLink to="/"><img className='logo' src="https://cdn-icons-png.flaticon.com/128/1698/1698771.png" alt=""/></NavLink></h1>
                  <li><i className='bx bxs-dashboard'></i><NavLink to="/shop/dashboard">Mahsulotlar paneli</NavLink></li>
                  <li><i className='bx bxs-basket' ></i><NavLink to="/shop/products">Mahsulotlar</NavLink></li>
                  <li><i className='bx bxs-basket' ></i><NavLink to="/shop/clients">Mijozlar</NavLink></li>
                  <li><i className='bx bxs-battery-charging' ></i><NavLink to="/shop/sales">Sotuvlar</NavLink></li>
                  <li><i className='bx bxs-basket' ></i><NavLink to="/shop/dashboard">Toifa</NavLink></li>
                  <li><i className='bx bxs-basket' ></i><NavLink to="/shop/dashboard">Yetkazib beruvchilar</NavLink></li>
                  <li><i className='bx bxs-battery-charging' ></i><NavLink to="/shop/order">Buyurtma</NavLink></li>
                  <li><i className='bx bxs-basket' ></i><NavLink to="/shop/dashboard">Kuponlar</NavLink></li>
               </ul>
            </div>
        </div>
    );
 }
 
 export default Dashboard;