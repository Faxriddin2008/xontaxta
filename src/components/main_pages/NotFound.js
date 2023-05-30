import React, { Component } from 'react';
import NotFoundd from "../../assets/img/NotFound.jpg"
import { NavLink } from 'react-router-dom';
import Dashboard from '../shop_pages/Dashboard';
import ShopNavBar from '../shop_pages/ShopNavBar';
function NotFound() {
    return ( 
            
                <div className='d-flex full notfoundwrap'>
                    <NavLink to="/" className="back_link">Back to Main Page</NavLink>
                    <img className='notfound' src={NotFoundd}/>
                </div>        
    );
}

export default NotFound;