import React from "react"
import axios from 'axios'
import "./Registration.css"
import { useAuth } from "../Auth"
import {
    Link
  } from "react-router-dom"

export default function Home(){

    const auth=useAuth()
    function handleLogout(event){
        auth.logout()
        window.location.reload()
    }
    return(
        <div className="ShowData-page">
            {!auth.user&&(<h1>Please register. If already registered, log in.</h1>)}
            {auth.user&&(<h1>Welcome, {auth.user.username}</h1>)}
            {auth.user&&auth.user.type=="user"&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/user`}>View Details</Link></button>)}
            {auth.user&&auth.user.type=="admin"&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/admin`}>Registered users</Link></button>)}
            {auth.user&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/`} onClick={handleLogout}>Logout</Link></button>)}
            {!auth.user&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/login`}>Login</Link></button>)}
            {!auth.user&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/register`}>Register</Link></button>)}
            {!auth.user&&(<button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/adminlogin`}>Admin Login</Link></button>)}
        </div>
    )
}