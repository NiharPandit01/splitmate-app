"use client";
import {useState} from "react";
export default function RegisterPage(){

    const[user,setUser] = useState({
        name:"",
        email:"",
        password:""
    });
    const [message, setMessage] = useState("");

    const handleRegister = async()=>{
        const response = await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)});
        const data = await response.json();
        setMessage(data.message);
    };
    return(
        <div>
            <h1>CreateAccount</h1>
            <p>{message}</p>
            <form onSubmit={(e)=>{e.preventDefault();
                           handleRegister();
            }} >
                <input type="text" placeholder ="Name" value ={user.name} onChange ={(e)=>setUser({...user,name:e.target.value})} />
                   <input type="email" placeholder ="Email" value ={user.email} onChange ={(e)=>setUser({...user,email:e.target.value})}/>
                      <input type="password" placeholder ="Password" value ={user.password} onChange ={(e)=>setUser({...user,password:e.target.value})} />
                      <button>Register</button>
            </form>
        </div>
    );
}