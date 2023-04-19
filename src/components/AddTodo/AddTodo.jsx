import React, { useEffect } from 'react'
import { object, string, number, date, InferType } from 'yup';
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTodo, updateTodo, getTodoByTodoId} from '../../redux/todoSlice';
import {toast} from 'react-toastify'

const AddTodo = () => {
    let {todoId} = useParams();
    const [todoData, setTodoData] = useState({title : '', message : ''});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //getting state from redux store
    const {todo, isError,isSuccess, message} = useSelector(state => state.todo)
 
    //update todo value from input
    function handleChange(e){
        setTodoData({...todoData, [e.target.name] : e. target.value})
    }

    //set orginal state of todo and id
    function clear(){
      setTodoData({title: '', message : ''});
      todoId = 0;
    }

    // function to handle add or edit the todo
    function handleSubmit(e){
      e.preventDefault();
      
      if(!todoData.title || ! todoData.message){
        toast.error("All feilds required");
        return;
      }

      if(!todoId){
        dispatch(createTodo(todoData));        
        clear();
      }
      else{
        dispatch(updateTodo({todoId, todoData}));
        clear();
        navigate('/todo/all_todos')
      }

      if(isSuccess && todo){
        toast.success(message || todoId ? "Todo updated" : "Todo created");
       }

       else if(isError){
        toast.error(message || "Something went wrong")
       }
    }

    //use effect to render data dynamically
    useEffect(() => {
      setTodoData(todo)
    },[todo])

    //use effect
    useEffect(()=>{
      let subscribed = true; 
      const user = localStorage.getItem('user');
       if(!user){
        navigate("/user/login")
       }    
       if(todoId && subscribed){
         dispatch(getTodoByTodoId(todoId));
       }

       return () => {
        subscribed = true;
       }
    },[])

    //DOM rendering
  return (
    <>
     <form className="w-25 mx-auto m-5 p-2 border border-2 border-primary rounded">
        <h3 className="text -center text-primary fw-bold">Add Todo</h3>
        <div className="my-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            name='title'
            value={todoData.title}
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
          <label>Message</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Message"
            name='message'
            value={todoData.message}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary w-50 mx-auto my-2 fw-bold">
            Submit
          </button>
        </div>
      </form>
   </>
  )
}

export default AddTodo