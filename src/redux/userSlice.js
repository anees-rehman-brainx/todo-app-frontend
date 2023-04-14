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
        console.log("regiter slice")
        const response = await userService.register(user);
        return response;
    
    } catch (error) {
        const message = helper(error)
        console.log(message)
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

// export const reset =


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
            state.user = "";
        }
    },

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
            state.user = null;
        })
        // .addCase(logout.fulfilled, (state, action) => {
        //     state.user = null;
        // })
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
