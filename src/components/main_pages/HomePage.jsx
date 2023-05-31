import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import landing_photo1 from "../../assets/img/landing_photo1.png"
import landing_photo2 from "../../assets/img/landing_photo2.png"
import landing_photo3 from "../../assets/img/landing_photo3.png"
import landing_photo5 from "../../assets/img/landing_photo5.png"
import blog_photo from "../../assets/img/blog_photo.png"
import { initial_values } from '../../auth';
import { handleClick } from '../CheckingFunctions';

// const token = initial_values.userData.token;


function HomePage({top_picks}) {
    let navigate = useNavigate()
    // localStorage.setItem('userData', JSON.stringify(initial_values.userData))
    const newUserData = localStorage.getItem('userData') ? localStorage.getItem('userData') : [];
    const now = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}, ${new Date().getDate() < 10 ? '0' + new Date().getDate()  : new Date().getDate()}.${new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()}.${new Date().getFullYear()}`
    let blogs = [
        {
            img: blog_photo,
            slogan: "Going all-in with millennial design",
            time: `${now}`,
        },
        {
            img: blog_photo,
            slogan: "Going all-in with millennial design",
            time: `${now}`,
        },
        {
            img: blog_photo,
            slogan: "Going all-in with millennial design",
            time: `${now}`,
        },
    ]
    return (
    <div>
        <NavBar bg="orange"/>
        <header className='header'>
            <div>
                <h2>Rocket single <br /> seater</h2>
                <h3><p style={{cursor: 'pointer'}} onClick={() => handleClick(navigate)}>Shop Now</p></h3>  
            </div>    
            <div>
                <img src={landing_photo1} alt="" />    
            </div>    
        </header>
        <main className='main'>
            <div>
                <img src={landing_photo2} alt="" />
                <div>
                    <div>
                        <h2>Side table</h2>
                        <h3>View More</h3>
                    </div>
                    <div></div>
                </div>
            </div>
            <div>
                <img src={landing_photo3} alt="" />
                <div>
                    <div>
                        <h2>Side table</h2>
                        <h3>View More</h3>
                    </div>
                    <div></div>
                </div>
            </div>
        </main> 
        <section className='top-picks'>
            <h1>Top Picks For You</h1>
            <p>Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
            <div>
                {
                    top_picks.map(item => 
                         
                        <div>
                            <img src={item.img} alt="" />
                            <p>{item.name}</p>
                            <h1>{item.price}</h1>
                        </div>
                        
                    )
                }
            </div>
            <h2>View More</h2>
        </section>
        <section className='asgaard'>
            <div>
                <img src={landing_photo5} alt="" />
            </div>
            <div>
                <p>New Arrivals</p>
                <h2>Asgaard sofa</h2>
                <button>Order Now</button>
            </div>
        </section>   
        <section className='top-picks'>
            <h1>Our Blogs</h1>
            <p>Find a bright ideal to suit your taste with our great selection</p>
            <div>
                {
                    blogs.map(item => 
                        <div className='blog'>
                            
                            <img src={item.img} alt="" />
                            <h4>{item.slogan}</h4>
                            <h3>Read More</h3>
                            
                            <p> <i className='bx bx-calendar'></i> { item.time}</p>
                        </div>    
                    )
                }
            </div>
        </section>
        <section className='insta_page'>
            <h1>Our Instagram</h1>
            <p>Follow our store on Instagram</p>
            <button><Link to="https://instagram.com/abduvasiyev.f">Follow Us</Link></button>
        </section>
        <footer>
            <div className='adres'>
                <p >400 University Drive Suite 200 Coral <br /> Gables, <br /> FL 33134 USA</p>
            </div>
            <div>
                <ul>
                    <p>Links</p>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <ul>
                    <p>Help</p>
                    <li>Payment options</li>
                    <li>Returns</li>
                    <li>Privacy Policies</li>
                </ul>
            </div>
            <div>
                <p>Newsletter</p>
            </div>
        </footer>
    </div> 
    );
}

export default HomePage;