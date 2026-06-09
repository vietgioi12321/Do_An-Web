import axios from 'axios';
import md5 from 'md5';

const API_URL = 'http://localhost:5000/api/users';

export const loginService = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password: md5(password)
    });
    return response.data;
};

export const recoverPasswordService = async (username, email) => {
    const response = await axios.post(`${API_URL}/recoverPassword`, {
        username,
        email
    });
    return response.data;
}

export const changePassword = async (username, newPassword,newPassword2) =>{
    const response = await axios.post('http://localhost:5000/api/users/changePassword', {
        username,
        newPassword,
        newPassword2
    });
    return response.data; 
}
