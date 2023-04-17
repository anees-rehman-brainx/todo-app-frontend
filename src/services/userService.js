import axios from 'axios'
import { API_URL } from '../config';

//Signup user service
export const register = async (user) => {
    const response = await axios.post(`${API_URL}/user/register`, user);
    return response.data;
}

//Login user service
export const login = async (user) => {
    const response = await axios.post(`${API_URL}/user/login`, user);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

//forgot password
export const forgotPassword = async(email) => {
    const response = await axios.post(
        `${API_URL}/user/forgot_password`,
        {email : email}
    )
    return response.data;
}

//reset password by link provided in mail
export const resetPassword = async(data) => {
    const {id, token, password, confirmPassword} = data;
    const response = await axios.put(
            `${API_URL}/user/reset_password/${id}}`,
            {
                newPassword : password,
                confirmNewPassword : confirmPassword
            },
            {headers:`Bearer ${token}`}
        )
        return response.data;
}

