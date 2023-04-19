import axios from 'axios'
import { API_URL } from '../config';
const user = JSON.parse(localStorage.getItem('user')) 
 const userId = user?.user?._id;
 const token = user?.user?.token;

//Signup user service
export const register = async (user) => {
    console.log("service hits")
    const response = await axios.post(`${API_URL}/user/register`, user);
    console.log(response.data)
    return response.data;
}

//Login user service
export const login = async (user) => {
    console.log("service hits")
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
            {headers : {'access_token' : `Bearer ${token}`}}
        )
        return response.data;
}

//change password
export const changePassword = async(data) => {
    console.log("service hits")
    const {oldPassword, newPassword, confirmNewPassword} = data;
    console.log(oldPassword, newPassword, confirmNewPassword)
    const response = await axios.put(
        `${API_URL}/user/change_password`,
        {
            oldPassword : oldPassword,
            newPassword : newPassword,
            confirmNewPassword : confirmNewPassword
        },
        {headers : {'access_token' : `Bearer ${token}`}}
    )
    return response.data;
}

