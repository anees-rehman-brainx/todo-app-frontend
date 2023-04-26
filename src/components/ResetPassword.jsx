import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from "react-router-dom"
import {resetPassword, reset} from '../redux/userSlice'
import { toast } from "react-toastify";
import {passwordRegex} from '../constants/constant'

const ResetPassword = () => {
  const {id, token} = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {isError, isSuccess, message} = useSelector(state => state.user)

  useEffect(() => {

    if(isSuccess){
      toast.success(message || "Password Updated");
      navigate('/user/login')
    }

    else if(isError){
      toast.error(message || "Something went wrong")
    }

    return () => {
      dispatch(reset())
    }
  },[isError, isSuccess])

  //handle submit button action
  function handleSubmit(e){
    e.preventDefault()

    if(!password || ! confirmPassword){
      toast.error("All feilds are required");
      return;
    }

    if(password !== confirmPassword){
      toast.error("Password must be same");
      return;
    }

    if(!password.match(passwordRegex)){
      toast.error("Password must contain character, number,special character, an uppercase, a lower case letter");
      return;
    }

    dispatch(resetPassword({id, token,password, confirmPassword}));
  }

  return (
    <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
        <h3 className="text-center text-primary fw-bold">Reset Your Password</h3>
        <div className="my-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password again"
            name='ConfirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary w-50 mx-auto my-2 fw-bold" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    
  )
}

export default ResetPassword
