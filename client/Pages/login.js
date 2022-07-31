import { useState } from "react";
import axios from "axios";
import {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";


const Login= ()=>{
    
    const [email, setEmail]= useState("goStand@gmail");
    const [password, setPassword]= useState("obominus");
    const [Loading, setLoading]= useState(false)

    const handlesubmit= async (e)=>{
        e.preventDefault();
       // console.table(name, email, password) 
       
       try{
           
           setLoading(true)
           await axios.post("/api/login",{
            email, 
            password})

            toast.success("Login Successful")

            setLoading(false)
            
       }
            catch(err){
                console.log("this is the error ", err)
               
                toast.error(err.response.data)
                setLoading(false)
            }
    };

    return(
        <>
        <h1 className="jumbotron text-center ">Login</h1>
        
        <div className="container col-md-4 offset-md-4 pb-4">

            <form   onSubmit={handlesubmit} >
                <ul>
                    <li>
                
                <input type="email" className="form-control  mb-4 p-4"  
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value) }
                        required>
                </input>
                </li>

                <li>
                <input type="password" className="form-control  mb-4 p-4"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value) }
                        required>
                </input>
                </li>
                <li>
                <button className="btn  btn-secondary " 
                disabled={!email || !password || Loading} > 
                {Loading ? <SyncOutlined sync/>: "Submit"}
                </button>
                </li>    
                </ul>
            </form>
                    <p className="text-center p-3 " >
                        Not yet registered? 
                        <Link href="/register">
                            <a>  Register  </a>
                        </Link>
                        
                    </p>
        </div>
        </>
    );
};

export default Login;