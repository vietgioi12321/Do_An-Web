import axios from 'axios';
import md5 from 'md5';

const API_URL = 'http://localhost:5000/api/users';

export const loginService = async (username, password) => {
    // Chỉ xử lý gửi dữ liệu và nhận phản hồi
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password: md5(password)
    });
    return response.data; // Trả về { token, user }
};

export const recoverPasswordService = async (username, email) => {
    // Chỉ xử lý gửi dữ liệu và nhận phản hồi
    const response = await axios.post(`${API_URL}/recoverPassword`, {
        username,
        email
    });
    return response.data; // Trả về { token, user }
};