import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import todoReducer from './todoSlice'

export default configureStore({
    reducer : {
        user : userReducer,
        todo : todoReducer
    },
})