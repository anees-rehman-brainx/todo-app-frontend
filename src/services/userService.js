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
    console.log("service hits")
    const {id, token, password, confirmPassword} = data;
    console.log(id, token, password)
    const response = await axios.put(
            `${API_URL}/user/reset_password/${id}/${token}`,
            {
                newPassword : password,
                confirmNewPassword : confirmPassword
            }
        )
        console.log(response)
        return response.data;
}

