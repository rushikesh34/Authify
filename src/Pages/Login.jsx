  import { Link, useNavigate } from "react-router-dom";
  import { assets } from "../assets/assets";
  import { useContext, useState } from "react";
  import axios from 'axios';
  import { AppContext } from "../context/AppContext";
  import { toast } from "react-toastify";

  function Login() {
    const [IscreateAccount, setIscreateaccount] = useState(false);
    const [name, setname] = useState("");
    const  [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const { backend_url, setIsloggedIn,getUserData}=useContext(AppContext);
    const navigate=useNavigate();


    const onSubmitHandler=async (e)=>{
        
      e.preventDefault();
    axios.defaults.withCredentials=true
    setloading(true)
    try{
      if(IscreateAccount){
        // register api
        const response= await axios.post(`${backend_url}/register`,{name,email,password});
        if(response.status == 200){
          navigate('/');
          toast.success("Account created succesfully.");

        }else{
          toast.error("Email already exits.");
        }
      }else{
       
        // login api
          const response=await axios.post(`${backend_url}/login`,{email,password});
          if(response.status==200){
                setIsloggedIn(true);
                navigate("/");
                getUserData();
                
          }
          
        
      }
    }catch(err){
      toast.error("Something went wrong");
    }finally{
      setloading(false);
    }

  }



    return (
      <div
        className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(90deg,#6a5af9,#8268f9)",
          border: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "24px",
              textDecoration: "none",
            }}
          >
            <img src={assets.logo} alt="logo" height={50} width={42} />
            <span className="fw-bold fs-4 text-light ">Authify</span>
          </Link>
        </div>
        <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">
            {IscreateAccount ? "Create account" : "Login"}
          </h2>
          <form onSubmit={onSubmitHandler}>
            {IscreateAccount && (
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="form-control"
                  placeholder="Enter fullname"
                  required
                  onChange={(e)=>setname(e.target.value)}
                  value={name}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Id
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Enter Email"
                required
                onChange={(e)=>setemail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="**********"
                required
                onChange={(e)=>setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/reset-password" className="text-decoration-none">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {
                loading?"Loading...":IscreateAccount?"Sign up":"Login"
              }
            </button>
          </form>

          <div className="text-center">
            <p className="mb-0">
              {IscreateAccount ? (
                <>
                  Already have an account?
                  <span
                    className="text-decoration-underline "
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                    onClick={() => setIscreateaccount(false)}
                  >
                    Login here
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?
                  <span
                    className="text-decoration-underline "
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                    onClick={() => setIscreateaccount(true)}
                  >
                    Sign up
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
