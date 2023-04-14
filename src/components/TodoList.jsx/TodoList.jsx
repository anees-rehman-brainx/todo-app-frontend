import React, { useEffect, useState } from 'react'
import TodoItem from '../TodoItem.jsx/TodoItem'
import {getAllTodosOfUser} from '../../redux/todoSlice'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {deleteTodoByTodoId} from '../../redux/todoSlice'


const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [todos, setTodos] = useState([])
  // getting state from redux
  const  {todo, isLoading, isSuccess, isError, message} = useSelector(state => state.todo)
  const todos = Array.from(todo);

  useEffect(() => {
    dispatch(getAllTodosOfUser());
  },[todo,navigate])

  //protecting route
  useEffect(() => {
    const user = localStorage.getItem('user');
    if(!user){
     navigate("/user/login")
    }    
  })

  //edit todo 
  function editTodo(event){
    const todoId = event.target.id;
    navigate(`/todo/update_todo/${todoId}`)
  }

  //delete todo
  function deleteTodo(event){
    const todoId = event.target.id;
    dispatch(deleteTodoByTodoId(todoId));
  }

  return (
    <>
    {todos.map(todo => {
      return(
        <TodoItem 
          _id={todo._id} 
          title={todo.title} 
          message={todo.message} 
          editTodo={editTodo} 
          deleteTodo={deleteTodo}
        />
      )
    })}
    </>
    )
}

export default TodoList