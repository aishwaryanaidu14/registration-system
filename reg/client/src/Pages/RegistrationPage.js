import './Registration.css';
import React from 'react';
import {useNavigate,Link} from "react-router-dom"
import axios from "axios"
const ColorPalette={
    pink:'#fe8787',	
    yellow: '#fab340',	
    blue1: '#6d99a2',	
    blue2: '#02808f',	
    blue3: '#124c60',	  
}


export default function RegistrationPage(){

    const [formData, setFormData]=React.useState({
        firstName:"",
        lastName:"",
        id:'',
        address:'',
        phoneNumber:'',
        username: '',
        password:'',
    })
    
    const navigate=useNavigate()

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
        if(!formData.id){
            alert("ID cannot be empty")
            return
        }
        else if(!formData.username){
            alert("Username cannot be empty")
            return
        }
        else if(!formData.password){
            alert("Password cannot be empty")
            return
        }
        else if(!formData.firstName){
            alert("First name cannot be empty")
            return
        }
        else if(!formData.lastName){
            alert("Last name cannot be empty")
            return
        }
        else if(!formData.address){
            alert("Address cannot be empty")
            return
        }
        else if(!formData.phoneNumber){
            alert("Phone number cannot be empty")
            return
        }


        
            /*const fetchUserData=async()=>{
                try{
                    navigate("/")
                    //await axios.post("http://localhost:3010/userdata", formData)
                    const res=await axios.post("http://localhost:3010/auth/register", formData)
                    if(res.data=="EXISTS"){
                        alert("Registration failed. Account with given ID or username already exists. Try again.")
                            //console.log()
                            return
                    }else{
                        alert("Registration successful. Please login.")
                    }
                    
                }
                catch(error){
                    console.log(error)
                }
            }
            fetchUserData()*/

            async function getRegister(){
                try{
                    let res=await axios.post("http://localhost:3010/auth/register", formData)
                    //console.log(formData)
                    return res.data
                }catch(error){
                    console.log(error)
                    return error
                }
            }
            getRegister().then((result)=>{
               // console.log("hii")
                //console.log(result)
                if(result!="EXISTS"){
                    //console.log("in")
                    alert("Registration successful. Please login.")
                    navigate('/')
                }
                else{
                    //console.log(result)
                    alert("Registration failed. Account with given ID or username already exists. Try again.")
                }
            })
            
          //  auth.login(formData)
          //  console.log(auth.user)
       
    }

    return(
        <div className="RegistrationPage">
            <header>
                <h1>Registration Portal</h1>
            </header>
            <div className="container">
                <div className='section-one'>
                <input 
                        placeholder="ID"
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                    <input 
                        placeholder="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input 
                        placeholder="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
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
                </div>
                <div className='section-two'>
                    <input 
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={formData.address}
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
            </div>
           <button style={{width:"300px"}} onClick={handleClick}>Submit</button>
           <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to="/">Home</Link></button>
        </div>
    );
}