import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as userService from '../services/userService'

const user = JSON.parse(localStorage.getItem("user"));

//store initial state
const initialState = {
    user : user ? user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}

// Register the user
export const register = createAsyncThunk('user/register', async(user, thunkAPI) => {
    try {
        const response = await userService.register(user);
        return response;
    
    } catch (error) {
        const message = helper(error)
        return thunkAPI.rejectWithValue(message)
    }
})

// Login the user
export const login = createAsyncThunk('user/login', async(user, thunkAPI) => {
    try {
        const response = await userService.login(user)
        return response

    } catch (error) {
        const message = helper(error); 
        return thunkAPI.rejectWithValue(message);
    }
})

// forgot password
export const forgotPassword = createAsyncThunk('user/forgotPassword', async(email, thunkAPI) => {
    try {
        const response = await userService.forgotPassword(email);
        return response;

    } catch (error) {
        const message = helper(error);
        return thunkAPI.rejectWithValue(message);
    }
})

// reset password
export const resetPassword = createAsyncThunk('user/resetPassword', async(data,thunkAPI) => {
    try {
        const response = await userService.resetPassword(data);
        return response;

    } catch (error) {
        const message = helper(error);
        return message;
    }
})

//change password
export const changePassword = createAsyncThunk('user/changePassword', async(data, thunkAPI) => {
    try {
        const response = await userService.changePassword(data);
        return response;

    } catch (error) {
        const message = helper(error);
        return message;
    }
})

// user slice
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        reset : (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''
            }
    },
    //extra reducers defined with use cases
    extraReducers : (builder) => {
     builder
        .addCase(register.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.user = action.payload.savedUser;
            state.message = action.payload.message
        })
        .addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
        })
        //login cases
        .addCase(login.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
            
        })
        //forgot password use cases
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.message = action.payload.message;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
        })
        //reset password use cases 
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.message = action.payload.message;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
        })
        //change password
        .addCase(changePassword.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.message = action.payload;
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
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

export const {reset} = userSlice.actions;
export default userSlice.reducer;
