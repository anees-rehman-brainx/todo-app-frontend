import React, { useEffect, useState } from 'react'
import { object, string, number, date, InferType } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from "../redux/userSlice";
import {  } from "../constants/constant";


const Register = () => {
  const [userData, setUser] = useState({username:'', email: '', password:'', confirmPassword:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting state from redux
  let  {user, isSuccess, isError, message} = useSelector(state => state.user)

  function handleChange(e){
    setUser({...userData, [e.target.name]:e.target.value});
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      toast.error('logout first');
      navigate("todo/create_todo")
    }
  })
  
  
  //updating status w.r.t user state in store
  useEffect(()=>{

    if(isSuccess){
      toast.success('Register successfull..');
      dispatch(reset())
      navigate('/user/login',{state:{isSuccess : false, isError : false, message : ''}})
    }

    else if(isError){
      toast.error(message)
    }

  },[isSuccess,isError])

  //Handleing submit button
  async function handleSubmit(e){
    e.preventDefault();

    const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    if(!userData.username || !userData.email || !userData.password){
      toast.error("All feilds are required");
      return;
    }

    if(userData.password !== userData.confirmPassword){
      toast.error("Password does't match..");
      return;
    }

    if(!userData.email.match(emailRegex)){
      toast.error("Invalid Email");
      return;
    }

    if(!userData.password.match(passwordRegex)){
      toast.error("Invalid password")
      return;
    }

    // if(isValid){
    //   dispatch(register(userData));
    // }
    dispatch(register(userData))

  }
  return (

    <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
        <h3 className="text-center text-primary fw-bold">Register</h3>
        <div className="my-3">
          <label>Username:</label>
          <input 
            type="text"
            className="form-control"
            placeholder="Enter username"
            name='username'
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <div className="my-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password again"
            name='confirmPassword'
            value={userData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary w-50 mx-auto my-2 fw-bold">
            Submit
          </button>
        </div>
        <p>Already Have an account? <Link to={'/user/login'}>Sign In</Link></p>
        <p className="forgot-password text-right">
          <Link to={'/user/forgot_password'}>Forgot Password</Link> 
        </p>
      </form>
    

  )
}

export default Register