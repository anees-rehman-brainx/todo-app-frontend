import { useState , useEffect} from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, date, InferType } from 'yup';
import {login} from  '../redux/userSlice'
import { toast } from "react-toastify";

const Login = () => {

  const [user,setUser] = useState({email:'', password:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e){
    setUser({...user,[e.target.name]:e.target.value});
  }

  const {savedUser, isError, isLoading, isSuccess, message} = useSelector(state => state.user)
  // yup validator schemas
  const regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  const validatorSchema = object({
    email : string().email().required(),
    password : string().matches(regex).required().min(8).max(16)
  });

  //updating status w.r.t user state in store
  useEffect(()=>{
    if(isSuccess){
      toast.success('Login successfull..');
      navigate('/todo/create_todo')
    }

    else if(isError){
      toast.error(message)
    }

  },[savedUser, isLoading, isError, isSuccess, dispatch])

  //handleing submit button
  async function handleSubmit(e){
    e.preventDefault();
    const isValid = validatorSchema.validate(user);

    if(isValid){
      dispatch(login(user));
    }
  }

  return (
    <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
        <h3 className="text-center text-primary fw-bold">Sign In</h3>
        <div className="my-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
            value={user.email}
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
            value={user.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary w-50 mx-auto my-2 fw-bold">
            Submit
          </button>
        </div>
        <p>Dont Have account? <Link to={'/user/register'}>Register</Link></p>
        <p className="forgot-password text-right">
          <Link to={'/user/forgot_password'}>Forgot Password</Link> 
        </p>
      </form>
    
  )
}

export default Login
