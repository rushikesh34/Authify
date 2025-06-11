import { createContext, useEffect, useState } from "react";
import { constansts } from "../Util/Constants";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext=createContext();

export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const backend_url=constansts.BACKEND_URL;
    const [IsLoggedIn,setIsloggedIn]=useState(false);
    const [userData,setuserData]=useState(false);



    const getUserData=async ()=>{
        try{
        const response=await axios.get(backend_url+"/profile");
        if(response.status==200){
        setuserData(response.data);
        }else{
            toast.error("Unable to retrieve profile")
        }
        }catch(err){
             toast.error(err.message)
        }
    }


    const contextValue={
        backend_url,
        IsLoggedIn,
        setIsloggedIn,
        userData,
        setuserData,
        getUserData



    }


    const getAuthState=async()=>{
        try{
            const response=await axios(`${backend_url}/is-authenticated`)
            if(response.status===200 && response.data===true){
                setIsloggedIn(true);
                await getUserData();

            }else{
                setIsloggedIn(false);
            }
        }catch(e){
            
            console.error(e.message);
        }

    }

    useEffect(()=>{
        getAuthState();
    },[])
    return (
        <AppContext.Provider value={contextValue}>
            {
                props.children  
            }

        </AppContext.Provider>
    )
}