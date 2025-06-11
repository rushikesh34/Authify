import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


function MenuBar() {
    const navigate=useNavigate();
    const [dropDownOpen, setdropDownOpen] =useState(false);
    const dropDownRef = useRef(null);
    const{userData,backend_url,setIsloggedIn,setuserData}=useContext(AppContext);


    useEffect(()=>{
        const handleClickOutside=(event)=>{
            
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setdropDownOpen(false);
            };

        };
        document.addEventListener("mousedown",handleClickOutside);
        return ()=>document.removeEventListener("mousedown",handleClickOutside);
    },[]);

    const handleLogout=async ()=>{
            const response=await axios.post(`${backend_url}/logout`)
            if(response.status==200){
                setIsloggedIn(false);
                setuserData(false)
                toast.success("Logout successfully");
                navigate("/");
            }
    }


    const sentVerificationOTP=async()=>{
        try{
            axios.defaults.withCredentials=true;
            const response=await axios.post(`${backend_url}/send-verify-otp`)
            if(response.status===200){
                navigate("/email-verify")
                toast.success("OTP has been sent successfully.")
            }else{
                toast.error("Enable to send OTP!");
            }
        }catch(e){
            toast.error(e.response.data.message);
        }

    }
  return (
    
        <nav className='navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center gap-2'>
                <img src={assets.logo} alt="logo" width={32} height={32} />
                <span className='fw-bold fs-4 text-dark'>
                    Authify
                </span>

            </div>

            {userData ? (
                <div className='position-relative' ref={dropDownRef}>
                    <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" 
                    style={{
                        width:"40px",
                        height:"40px",
                        userSelect:"none",
                        cursor:"pointer"
                    }}
                    onClick={()=>{
                        setdropDownOpen((prev)=>!prev);
                    }}>
                        {userData.name[0].toUpperCase()}
                    </div>
                    {dropDownOpen && (
                        <div className='position-absolute shadow bg-white rounded p-2' 
                        style={{
                            top:"50px",
                            right:0,
                            zIndex:100
                        }}>
                            {!userData.accountVerified && (
                                <div className='dropdown-item py-1 px-2 ' style={{
                                    cursor:"pointer"
                                }} onClick={sentVerificationOTP}>
                                    Verify email

                                </div>
                            )}
                            <div className="dropdown-item py-1 px-2 text-danger" style={{cursor:"pointer"}} onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}

                </div>
            ):(
                <div className="btn btn-outline-dark rounded-pill px-3 "  onClick={()=>navigate("/login")}>
                login <i className='bi bi-arrow-right ms-2'></i>
            </div>
            )}

            

        </nav>
   
  )
}

export default MenuBar