import { createContext, useEffect, useRef, useState } from "react";
import { bootstrap } from "bootstrap";
import "./App.css";   
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Header from "./components/Header";
import {Route,Routes} from 'react-router-dom'
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import {increment,decrement} from './redux/userSlice'
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoItem from "./components/TodoItem.jsx/TodoItem";
import TodoList from './components/TodoList.jsx/TodoList'
import ChangePassword from "./components/ChangePassword";

function App() {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/user">
        <Route path="register" element = {<Register/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="login/:id" element={<Login/>} />
        <Route path="forgot_password" element={<ForgotPassword/>} />
        <Route path="reset_password/:id/:token" element={<ResetPassword/>} />
        <Route path="change_password" element={<ChangePassword/>} />
      </Route>

      <Route path="/todo">
        <Route path="create_todo" element={<AddTodo/>} />
        <Route path="todo_item" element={<TodoItem/>} />
        <Route path="all_todos" element={<TodoList/>} />
        <Route path="update_todo/:todoId" element={<AddTodo/>} />
      </Route>
      <Route path="/" element={<Login/>} />
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;

