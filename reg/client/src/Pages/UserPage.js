import React from "react"
import axios from 'axios'
import "./Registration.css"
import { useAuth } from "../Auth"
import {
    Link
  } from "react-router-dom"

export default function UserPage({children}){
    const [userData, setUserData]=React.useState([])
    const auth=useAuth()
    React.useEffect(()=>{
        const fetchUserData=async()=>{
            try{
                const res=await axios.get("http://localhost:3010/getuserdata/"+auth.user.id)
                setUserData(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchUserData()
    }, [])

    if(!auth.user||auth.user.type!="user"){
        return(
            <div>
                <h1>Please login or register to view this page.</h1>
                <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to="/">Home</Link></button>
        
            </div>
        )
    }
    //{{border:"1px solid #02808f", borderRadius:'1rem', textAlign:'left', lineHeight:'0.25rem', fontSize:'1rem', margin:'1rem', padding:'0.5rem'}}
    return(
        <div className="ShowData-page">
            <h1>User Details</h1>
            <div className="user-data-table">
                {userData.map(user=>(
                    <div style={{border:"1px solid #02808f", borderRadius:'1rem', textAlign:'left', lineHeight:'1rem', fontSize:'1rem', margin:'1rem', padding:'0.5rem'}} key={user.id}> 
                        <h3>{`ID: ${user.id}`}</h3>
                        <h3>{`First Name: ${user.firstName}`}</h3>
                        <h3>{`Last Name: ${user.lastName}`}</h3>
                        <h3>{`Phone Number: ${user.phoneNumber}`}</h3>
                        <h3>{`Address: ${user.address}`}</h3>
                        
                       
                    </div>
                ))}
            </div>
            <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/update`}>Update</Link></button>
            <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/`}>Home</Link></button>
                    
           
        </div>
    )
}