import { useState } from "react";
import axios from "axios";
import {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";


const Register= ()=>{
    const [name, setName]= useState("go");
    const [email, setEmail]= useState("go@try#test");
    const [password, setPassword]= useState("cominggo");
    const [Loading, setLoading]= useState(false)

    const handlesubmit= async (e)=>{
        e.preventDefault();
       // console.table(name, email, password) 
       
       try{
           
           setLoading(true)
           await axios.post("/api/register",{
            name, 
            email, 
            password})

            toast.success("User Registration Successful")

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
        <h1 className="jumbotron text-center square">Register</h1>
        
        <div className="container col-md-4 offset-md-4 pb-4">

        <form   onSubmit={handlesubmit}>
         <ul>
             <li>
            <input type="text" className="form-control  mb-4 p-4"
                     placeholder="Enter name"
                     value={name}
                     onChange={(e)=> setName(e.target.value) }
                     required>
            </input>
            </li>
            <li>
            <input type="email" className="form-control  mb-4 p-4" 
                        name="email" 
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
        <p className="text-center p-3" >
            Already registered? 
            <Link href="/login">
                <a>  Login  </a>
                </Link>
            </p>
        </div>
        </>
    );
};

export default Register;