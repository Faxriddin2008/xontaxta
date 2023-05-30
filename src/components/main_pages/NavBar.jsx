import React, { Component, useRef, useState } from 'react';
import { NavLink , Link, Navigate} from 'react-router-dom';
import { initial_values } from '../../auth';
import { useNavigate } from 'react-router-dom';
import About from './About';
import { handleClick } from '../CheckingFunctions';
function NavBar({bg}) {
    const token = initial_values.userData.token;
    let navigate = useNavigate()
    // const arr = [initial_values]
    const userData = initial_values.userData;
    let currentTime = new Date().getTime()
    // console.log(userData);
    // localStorage.setItem('userData', JSON.stringify(userData))
    
    const newUserData = localStorage.getItem('userData');
    // console.log(JSON.parse(newUserData));
    // console.log(arr);
    return ( 
        <nav className={`d-flex ul-wrapper ${bg == "orange" ? "orange" : "white"}`}>
            <ul></ul>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><p onClick={() => handleClick(navigate)} style={{cursor: 'pointer'}}>Shop</p></li>
                <li><Link to='/about' >About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
            <ul>
                <li><i className='bx bxs-user-circle'></i></li>
                <li><i className='bx bx-search'></i></li>
                <li><i className='bx bx-heart' ></i></li>
                <li><i className='bx bx-basket' ></i></li>
            </ul>
        </nav>
     );
}

export default NavBar;