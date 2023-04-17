import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import {changePassword, reset} from "../redux/userSlice"
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = () => {
    const [data, setData] = useState({oldPassword : '', newPassword : '', confirmNewPassword : ''});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isSuccess, isError, message} = useSelector(state => state.user)
    //check if user logged in or not
    useEffect(() => {
      const user = localStorage.getItem('user');
      
      if(!user){
        toast.error("Please login first");
        navigate("/user/login")
      }
    },[])

    //message notification
    useEffect(() => {
      if(isSuccess){
        toast.success(message || "Password updated");
        dispatch(reset());
        localStorage.clear();
        navigate('/user/login')
        
      }

      else if(isError){
        toast.error(message || "Something went wrong")
        //dispatch(reset())
      }
    }, [isSuccess, isError])

    function handleChange(e){
        setData({...data, [e.target.name]: e.target.value});

    }

    function handleSubmit(e){
        e.preventDefault();
        if(data.newPassword !== data.confirmNewPassword){
            toast.error("Password must be same");
            return;
        }

        dispatch(changePassword(data))
    }

  return (
    <>
    <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
      <h3 className="text-center text-primary fw-bold">Change Password</h3>
      <div className="my-3">
        <label>Old Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter old password"
          name="oldPassword"
          value={data.oldPassword}
          onChange={handleChange}
        />
      </div>
      <div className="my-3">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter new Password"
          name="newPassword"
          value={data.newPassword}
          onChange={handleChange}
        />
      </div>
      <div className="my-3">
        <label>Confirm New Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password again"
          name="confirmNewPassword"
          value={data.confirmNewPassword}
          onChange={handleChange}
        />
      </div>

      <div className="d-grid">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary w-50 mx-auto my-2 fw-bold"
        >
          Submit
        </button>
      </div>
    </form>
</>
  )
}

export default ChangePassword