import React, { Component, useEffect, useRef, useState } from 'react';
import ShopPage from './ShopPage';
import Dashboard from './Dashboard';
import ShopNavBar from './ShopNavBar';
import chair from "../../assets/img/chair.png"
import Product from '../shop_pages/Product_Pages/Product';
import AddModal from '../shop_pages/Product_Pages/Modal';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getSales } from './getSales';
function Sales() {
    const [sales, setSales] = useState([])
    useEffect(() => {
        async function get(){
            const saless = await getSales()
            setSales(saless)
        }
        get()
    }, [])
    console.log(sales);
    // let arr = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).sales : [];
    // const [arrr, setArrr] = useState(arr);
    // useEffect(() => {
    //         arrr.map((item, i) => <Product  img={item.img} price={item.price} name={item.name} discount={item.discount}/>)
    // }, [arrr])
    const url = "https://reqres.in/api/users?page=1";
    // axios(url).then(res => console.log(res.data.data))
    const inputRef = useRef(null)
    // function search(){
    //     const newArr = arr.filter(item => item.name.toLowerCase().includes(inputRef.current.value.toLowerCase()));
    //     setArrr(newArr.sort((a,b) => {return a.price - b.price}))
    // }
    return ( 
            <div className='shop-page'>
                <div>
                    <Dashboard/>
                </div>
                <div>
                    <ShopNavBar/>
                    <div className='products'>
                        <div className='articles'>
                            <h1>Sotib olinganlar</h1>
                            <button><NavLink to="/shop/products">Mahsulotlar ro'yxati</NavLink></button>
                        </div>
                        <div className='products_wrapper'>
                            <div className='filters'>
                                <input type="search" className='search' placeholder='🔍 Qidirish' ref={inputRef}  name="" id="" />
                                <div>
                                    <button><i className='bx bx-sort-down'></i></button>
                                    <button>Toifa</button>
                                    <button>Oxirgi qo'shilganlar</button>
                                </div>
                            </div>
                            <div className="cards">
                                {sales.map(item => 
                                    <div>
                                        <h1>{item.name}</h1>
                                    </div>    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Sales;