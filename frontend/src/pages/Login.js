import React, { useContext } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
 import "./Login.css"
 import axios from 'axios'
import Header from '../componenets/Header'
import { Navigate, useNavigate } from 'react-router'
import { AuthContext} from '../contexts/AuthContext';

const Login = () => {
     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const {login}=useContext(AuthContext);
  const navigate=useNavigate();
 const onSubmit =   async (data)=>{
    try{
        console.log("Sending login request with:", data);
        const response=await axios.post('/api/users/login',data);
        const {token,user}=response.data;
         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         console.log("Login successful. Response:", response.data);
        
        // localStorage.setItem('token',token);

         login(token,user);
                 alert('login Successful');
         navigate('/dashboard');
    }
    catch(error){
         console.error("Login failed:", error.response || error.message);
         alert(error.response?.data.message || 'Login failed!');
         console.log(error.message)
    
    }
 };

  return (
    <div>
        <Header></Header>
  
        <div className="loginBox">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
      <label>Email</label>
      <input type="email" {...register("email", { required: "Email address is required", pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                } })} />
            {errors.email&&<p className="error">{errors.Email.message}</p>}
            </div>
       <div className="form-group">     
      <label>Password</label>
      <input type="password" {...register("password",{required:"Password is required",
      minlength:{
        value:"8",
        message:"Password must be atleast 8 characters long "}
        })}/>
        {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
      <input type="submit" value="Login" />
        </form>
     </div>

    </div>
  )
}

export default Login
