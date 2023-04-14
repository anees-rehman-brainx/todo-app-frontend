import { useState } from "react"
import { Link, useParams } from "react-router-dom"

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e){

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
          <button type="submit" className="btn btn-primary w-50 mx-auto my-2 fw-bold">
            Submit
          </button>
        </div>
      </form>
    
  )
}

export default ResetPassword
