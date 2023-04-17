import { useState, useEffect } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, date, InferType } from "yup";
import { login, reset } from "../redux/userSlice";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../constants/constant";

const Login = () => {
  const [userData, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(e) {
    setUser({ ...userData, [e.target.name]: e.target.value });
  }

  let { user, isSuccess, isLoading, isError, message } = useSelector((state) => state.user);
  console.log(user, isSuccess, isError, isLoading, message)
  // yup validator schemas
  const validatorSchema = object({
    email: string().email().required(),
    password: string().matches(passwordRegex).required().min(8).max(16),
  });

  //check if user already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');

    if(user){
      toast.error("logout first");
      navigate("/todo/create_todo")
    }
  },[])

  //updating status w.r.t user state in store
  useEffect(() => {
    if (user && isSuccess) {
      toast.success("Login successfull..");
      dispatch(reset())
      navigate("/todo/create_todo");
    } else if (isError) {
      toast.error(message);
    }
  }, [user,isError, isSuccess,message, dispatch]);

  //handleing submit button
  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validatorSchema.validate(userData);

    if (isValid) {
      dispatch(login(userData));
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
          name="email"
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
          name="password"
          value={userData.password}
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
      <p>
        Dont Have account? <Link to={"/user/register"}>Register</Link>
      </p>
      <p className="forgot-password text-right">
        <Link to={"/user/forgot_password"}>Forgot Password</Link>
      </p>
    </form>
  );
};

export default Login;
