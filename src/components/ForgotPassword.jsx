import { useEffect, useMemo, useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { forgotPassword, reset } from "../redux/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //getting data from redux store
  const {isError, isSuccess, message} = useSelector(state => state.user)

  useEffect(() => {

    if(isSuccess){
      toast.success("Check Your Email")
      console.log(message)
    }

    else if(isError){
      toast.error(message || "Something went wrong")
    }

    return () => {
      dispatch(reset())
    }

  })

  //function to handle submit button
  function handleSubmit(e){
    e.preventDefault()

    if(!email){
      toast.error("Email required...");
      return;
    }
      dispatch(forgotPassword(email))
  }

  return (
    <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
        <h3 className="text-center text-primary fw-bold">Enter your email</h3>
        <div className="my-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword
