import { API_URL } from '../config';
import axios from 'axios'

 const user = JSON.parse(localStorage.getItem('user')) 
 const userId = user?.user?._id;
 const token = user?.user?.token;
//get all todos

export const getAllTodos = async() => {
    const todos = await axios.get(
        `${API_URL}/todo/get_all_todos`,
        {headers:`Bearer ${token}`}
        );
    return todos;
}

//get all todos of a user
export const getAllTodosOfUser = async() => {
    console.log(token)
    const todos = await axios.get(
        `${API_URL}/todo/get_todos_by_user_id`, 
        {headers : {'access_token' : `Bearer ${token}`}}
        );
    return todos.data;
}

// get todo by todo id
export const getTodoByTodoId = async(id) => {
    const response = await axios.get(
        `${API_URL}/todo/get_todo_by_todo_id/${id}`,
        {headers : {'access_token' : `Bearer ${token}`}}
        )
    console.log("getting todo by todo id");
    console.log(response.data);
    return response.data;
}

//Create a todo
export const createTodo = async(todo) => {
    const newTodo = await axios.post(
        `${API_URL}/todo/create_todo`,
         todo,
         {headers : {'access_token':`Bearer ${token}`}}
      );
    localStorage.setItem('todo',JSON.stringify(newTodo.data))
    return newTodo.data;
}

//update todo 
export const updateTodo = async(todoId, todo) => {
    const newTodo = await axios.put(
            `${API_URL}/todo/update_todo/${todoId}`,
            todo,
            {headers :{'access_token' : `Bearer ${token}`}}
        );
    return newTodo.data;
}

//delete todo
export const deleteTodoByTodoId = async(todoId) => {
    console.log("delete service")
    const isDeleted = await axios.delete(
            `${API_URL}/todo/delete_todo_by_todo_id/${todoId}`,
            {headers : {'access_token' : `Bearer ${token}`}}
         );
        
    console.log(isDeleted)
}

//delete all todos of a user
export const deleteAllTodos = async(userId) => {
    const isDeleted = await axios.delete(`
        ${API_URL}/todo/delete_all_todos_by_user_id`,
        {headers : `Bearer ${token}`}
     )
}





