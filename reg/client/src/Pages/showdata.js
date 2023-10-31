import React from "react"
import axios from 'axios'
import {
    Link
  } from "react-router-dom"

export default function ShowData(){
    const [usersData, setUsersData]=React.useState([])

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

    return(
        <div className="ShowData-page">
            <h1>ShowData</h1>
            <div className="user-data-table">
                {usersData.map(user=>(
                    <div style={{backgroundColor:'#6d99a2', textAlign:'left', lineHeight:'0.25rem', fontSize:'1rem', margin:'1rem', padding:'0.5rem'}} key={user.id}> 
                        <h3>{`ID: ${user.id}`}</h3>
                        <h3>{`First Name: ${user.firstName}`}</h3>
                        <h3>{`Last Name: ${user.lastName}`}</h3>
                        <h3>{`Phone Number: ${user.phoneNumber}`}</h3>
                        <h3>{`Address: ${user.address}`}</h3>
                         <button onClick={()=>handleDelete(user.id)}>Delete</button>
                       <button><Link to={`/update/${user.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/register">Add new user</Link>
            </button>
        </div>
    )
}