import React from "react"
import axios from 'axios'
import "./Registration.css"
import {useAuth} from "../Auth"
import {
    Link
  } from "react-router-dom"

export default function ShowData(){
    const [usersData, setUsersData]=React.useState([])
    const auth=useAuth()
    React.useEffect(()=>{
        const fetchAllUserData=async()=>{
            try{
                const res=await axios.get("http://localhost:3010/userdata")
                setUsersData(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAllUserData()
    }, [])

    async function handleDelete(id){
        try{
            await axios.delete("http://localhost:3010/userdata/"+id)
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    if(!auth.user||auth.user.type!="admin"){
        return(
            <div>
                <h1>You do not have access to this page.</h1>
                <button><Link style={{color:"#fff", textDecoration:"none"}} to="/">Home</Link></button>
        
            </div>
        )
    }

    return(
        
        <div className="ShowData-page">
            <h1>Registered Users</h1>
            <div className="user-data-table">
                {usersData.map(user=>(
                    <div style={{border:"1px solid #02808f", borderRadius:'1rem', textAlign:'left', lineHeight:'0.25rem', fontSize:'1rem', margin:'1rem', padding:'0.5rem'}} key={user.id}> 
                        <h3>{`ID: ${user.id}`}</h3>
                        <h3>{`First Name: ${user.firstName}`}</h3>
                        <h3>{`Last Name: ${user.lastName}`}</h3>
                        <h3>{`Phone Number: ${user.phoneNumber}`}</h3>
                        <h3>{`Address: ${user.address}`}</h3>
                        
                    </div>
                ))}
            </div>
            <button style={{width:"300px"}}><Link style={{color:"#fff", textDecoration:"none"}} to={`/`}>Home</Link></button>
            
        </div>
    )
}