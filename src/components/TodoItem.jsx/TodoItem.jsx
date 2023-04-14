import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const TodoItem = ({_id,title, message, editTodo, deleteTodo}) => {

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');

    if(!user){
       navigate("/user/login")
    }    
  })

  return (
    <>
    <div id={_id} className="d-flex justify-content-between w-50 mx-auto m-5 p-2 border border-2 border-primary rounded ">
        <input type="checkbox" className='w-10' style={{width:25}}/>
        <h5 className=' my-3 w-25'>{title}</h5>
        <p className='my-3 w-50'>{message}</p>
        <div className='d-flex justify-content-between'>
            <button className='btn btn-success'style={{height:50}} id={_id}  onClick={(event) => editTodo(event)}>Edit</button>
            <button className='btn btn-danger' style={{height:50}} id={_id} onClick={(event => deleteTodo(event))}> Delete</button>
        </div>
    </div>
 </>
  )
}

export default TodoItem