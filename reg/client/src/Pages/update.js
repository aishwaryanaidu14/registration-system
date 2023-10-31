import './Registration.css';
import React from 'react';
import {useNavigate, useLocation, Link} from "react-router-dom"
import axios from "axios" 
import {useAuth} from "../Auth"
const ColorPalette={
    pink:'#fe8787',	
    yellow: '#fab340',	
    blue1: '#6d99a2',	
    blue2: '#02808f',	
    blue3: '#124c60',	  
}


export default function Update(){
    
    const auth=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    let userid=2
    if(auth.user){
        userid=auth.user.id
    }
    //console.log(user_name)
    
    const [formData, setFormData]=React.useState({})

    React.useEffect(()=>{
        const preUpdate=async()=>{
            try{
                const res=await axios.get("http://localhost:3010/getuserdata/"+userid)
                setFormData(res.data[0])
            }catch(error){
                console.log(error)
            }
        }
        preUpdate()
    }, [])
    
   
   
    function handleChange(event){
        setFormData(prevData=>({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        //console.log(formData)
    }

    React.useEffect(()=>{
       // console.log(formData)
    }, [formData])
    
    async function handleClick(event){
        var pattern=/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        if(!pattern.test(formData.phoneNumber)){
            alert("Enter a valid phone number")
            return;
        }
        try{
            await axios.put("http://localhost:3010/userdata/"+userid, formData)
            navigate("/")
        }
        catch(error){
            console.log(error)
        }
        console.log(formData)
    }
    if(!auth.user||auth.user.type!="user"){
        return(
            <div>
                <h1>Please login or register to view this page.</h1>
                <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to="/">Home</Link></button>
        
            </div>
        )
    }
    return(
        <div className="RegistrationPage">
            <header>
                <h1>Update Information</h1>
            </header>
            <div className="container">
                <div className='section-one'>
                <div className='static-id-field'>{formData.id}</div>
                    <input 
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                     <input 
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input 
                        placeholder="Phone Number"
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className='section-two'>
                    <input 
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
            </div>
           <button onClick={handleClick}>Submit</button>
        </div>
    );
}