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