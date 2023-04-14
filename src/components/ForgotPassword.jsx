import { useState } from "react"
import { Link, useParams } from "react-router-dom"

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  function handleSubmit(e){

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
          <button type="submit" className="btn btn-primary w-50 mx-auto my-2 fw-bold">
            Submit
          </button>
        </div>
      </form>
    
  )
}

export default ForgotPassword
