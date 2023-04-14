import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";
import * as todoService from '../services/todoService'

let todo = [
//     {
//     // userId : '',
//     // _id : '',
//     // title : '',
//     // message : '',
//     // todoStatus : '',
//     // createdAt : '',
//     // updatedAt : ''
// }
]

//Initial value in redux store
const initialState = {
    todo : todo,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}

//Creating todo
export const createTodo = createAsyncThunk('todo/createTodo', async (todo, thunkApi) => {
    try {
        const newTodo = await todoService.createTodo(todo);
        return newTodo;
    } catch (error) {
        const message = helper(error)
        return thunkApi.rejectWithValue(message);
    }
})

// get all todos of a user
export const  getAllTodosOfUser = createAsyncThunk('todo/getAllTodosByUserId', async(thunkApi) => {
    try {
        const todos = await todoService.getAllTodosOfUser();
        return todos;

    } catch (error) {
        const message = helper(error);
        return thunkApi.rejectWithValue(message);
    }
})

//get todo by todo id
export const getTodoByTodoId = createAsyncThunk('todo/getTodoByTodoId', async(todoId, thunkApi) => {
    try {
        const todo = await todoService.getTodoByTodoId(todoId);
        return todo;

    } catch (error) {
        const message = helper(error);
        return thunkApi.rejectWithValue(message);
    }
} )

// update todo by todo id
export const updateTodo = createAsyncThunk('todo/updateTodo', async({todoId,todoData}, thunkApi) => {
    try {
        const updatedTodo = await todoService.updateTodo(todoId, todoData);
        return updateTodo;
    } catch (error) {
        const message = helper(error);
        return thunkApi.rejectWithValue(message)
    }
    
})

//delete a todo by todo id
export const deleteTodoByTodoId = createAsyncThunk('todo/deleteTodoByTodoId', async(todoId, thunkApi) => {
    try {
        console.log("delete todo");
        const deletedTodo = await todoService.deleteTodoByTodoId(todoId);
        return deletedTodo;
        console.log(deletedTodo);
    } catch (error) {
        const message = helper(error);
        return thunkApi.rejectWithValue(message)
    }
})

//todo slice
const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers :{},
    extraReducers : (builders) => {
        builders
        //use cases for create todo
        .addCase(createTodo.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.message = action.payload.message
        })
        .addCase(createTodo.pending, (state, action) => {
            state.isLoading = true;
            state.message = action.payload
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
        })
        // get all todos of a user
        .addCase(getAllTodosOfUser.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.message = '';
            state.todo = action.payload
            console.log(state.todo)
        })
        .addCase(getAllTodosOfUser.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload;
        })
        // get todo by todo id
        .addCase(getTodoByTodoId.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.message = "hdbdhdb"
            console.log("acccc",action.payload)
            console.log(typeof(state.todo))
            console.log(state.todo)
            state.todo = action.payload
        })
        .addCase(getTodoByTodoId.rejected, (state, action) => {
            state.isError = true;
        })

        // update todo
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.message = action.payload.message;
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
        })

        //use cases for delete todo request
        .addCase(deleteTodoByTodoId.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(deleteTodoByTodoId.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

// helper function to generate error
const helper = (error) => {
    const message = ( 
        error.response &&
        error.response.data &&
        error.response.data.message ) ||
        error.message ||
        error.toString();

    return message;
}


export const {} = todoSlice.actions;
export default todoSlice.reducer;













