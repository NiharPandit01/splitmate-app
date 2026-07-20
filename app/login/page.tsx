"use client";
import {useState} from "react";
export default function LoginPage(){
    const [user,setUser]=useState({email:"",password:""});
    const handleLogin = async (e:any)=>{
        e.preventDefault();
         const response = await fetch("/api/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(user),
         });

         const data = await response.json();
         console.log(data);
    }
    
   
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleLogin}>
                <input type="email" placeholder="Email"  value ={user.email|| ""}onChange={(e)=>setUser({...user,email:e.target.value})}/>
                <input type="password" placeholder="password" value ={user.password|| ""} onChange={(e)=>setUser({...user,password:e.target.value})} />
                
                <button type ="submit">Login</button>
            </form>
            
            </div>
    );
}