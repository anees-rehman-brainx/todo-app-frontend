import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {reset} from "../redux/userSlice";


const Header = () => {
  let user = JSON.parse(localStorage.getItem('user')) 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout () {
   localStorage.clear();
  }

  return (
    <>
      <div className="container-fluid bg-primary w-100 my-3 d-flex align-items-center">
        <h1 className="col-sm-4 col-xs-2 col-lg-8 text-white fs-100  ">ToDo App</h1>
        {user &&
        <div className="col-sm-8 col-xs-10 col-lg-4 d-flex justify-content-between">
            <Link to={'/todo/create_todo'}> <h4 className="text-white my-3 text-center">Add Todo</h4></Link>
            <Link to={'/todo/all_todos'}> <h4 className="text-white my-3 text-center">All Todos</h4></Link>
            <Link to={'/user/login'}> <h4 className="text-white my-3 text-center" onClick={logout}>Logout</h4></Link>
            <Link to={'/user/change_password'}> <h4 className="text-white my-3 text-center">change Password</h4></Link>
          </div>           
        }
        {!user && 
          <div className="col-3 d-flex justify-content-between">
            <Link to={'/user/login'}> <h4 className="text-white my-3">Sign in</h4></Link>
            <Link to={'/user/register'}> <h4 className="text-white my-3 ">Sign up</h4></Link>
            </div>
        }
  
      </div>
    </>
  );
};

export default Header;
