// import { json } from "react-router-dom";

import { initial_values } from "../../auth";

import { useNavigate } from 'react-router-dom';
let currentTime = new Date().getTime()

export const handleClick = (callBack) => {

    const newUserData = localStorage.getItem('user');
    
    if(!newUserData){
        callBack("/signup")
    }
    else if(newUserData && JSON.parse(newUserData).tokenExpiredDate < currentTime && JSON.parse(newUserData).token == true){
        callBack("/signin")
    }
    else if(newUserData && JSON.parse(newUserData).tokenExpiredDate > currentTime ){
        callBack("/shop")
    }
}

export function Navigate(url){
    let navigate = useNavigate()
    navigate(url)
}



