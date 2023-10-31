import './Registration.css';
import React from 'react';
import {useNavigate, Link} from "react-router-dom"
import axios from "axios"
import {useAuth} from '../Auth'
const ColorPalette={
    pink:'#fe8787',	
    yellow: '#fab340',	
    blue1: '#6d99a2',	
    blue2: '#02808f',	
    blue3: '#124c60',	  
}


export default function RegistrationPage(){
    const [user, setUser]=React.useState('')
    const auth=useAuth()
    const navigate=useNavigate()
    const [formData, setFormData]=React.useState({
        username: "",
        password: ""
    })
    
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
    
    /*async function handleClick(event){
        try{
            const res=await axios.get("http://localhost:3010/auth/login", formData)
            alert("hi")
            if(res.status!=404){
                auth.login({...formData, id:res.data})
                console.log(auth.user)
                navigate('/')
            }
            else{
                alert("Invalid username or password. Try again.")
            }
        }catch(error){
            console.log(error)
        }
      //  auth.login(formData)
      //  console.log(auth.user)
        
    }*/

    async function handleClick(event){
        async function getLogin(){
            try{
                let res=await axios.post("http://localhost:3010/auth/adminlogin", formData)
                //console.log(formData)
                return res.data
                //alert("hi")
               /* if(res.data!="EXISTS"){
                    auth.login({...formData, id:res.data})
                  // auth.login(formData)
                    alert("in")
                    console.log(auth.user)
                    navigate('/')
                    
                }
                else{
                    alert("Invalid username or password. Try again.")
                }*/
            }catch(error){
                console.log(error)
                return error
            }
        }
        getLogin().then((result)=>{
            if(result!="NONE"){
              //  console.log(result)
                auth.login({...formData, id:result, type:'admin'})
              // auth.login(formData)
                alert("Login Successful")
               // console.log(auth.user)
                navigate('/')
                
            }
            else{
                console.log(result)
                alert("Invalid username or password. Try again.")
            }
        })
        
      //  auth.login(formData)
      //  console.log(auth.user)
        
    }

    return(
        <div className="RegistrationPage">
            <header>
                <h1>Admin Login</h1>
            </header>
            <div className="container">
                <div className='section-one'>
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
                </div>
            </div>
           <button style={{width:"300px"}} onClick={handleClick}>Login</button>
           <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to="/">Home</Link></button>
        </div>
    );
}