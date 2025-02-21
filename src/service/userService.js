import { apiClient } from "../api/apiClient";
import { login, register, me, logout } from "../config/constants";

export class UserService {
    
    static async login(data) {
        try {
            const response = await apiClient.post(login, data) // , { withCredentials: true }
            return response.data;
        } catch (e) {
            if (e.response && e.response.data.detail) {
                throw new Error(e.response.data.detail)
            } else {
                throw new Error('Ошибка при входе');
            }
        }
    }

    static async register(data) {
        try {
            const response = await apiClient.post(register, data)
            console.log('service');
            console.log(response);
            return response.data
        } catch (e) {
            if (e.response && e.response.data.detail) {
                throw new Error(e.response.data.detail.map(err => err.msg).join(', '));
            } else {
                throw new Error('Ошибка при регистрации');
            }
        }
    }

    static async logout() {
        try {
            const response = await apiClient.post(logout)
            
        } catch (e) {
            if (e.response && e.response.data.detail) {
                throw new Error(e.response.data.detail.map(err => err.msg).join(', '));
            } else {
                throw new Error('Ошибка при выходе');
            }
        }
    }

    static async getMe() {
        try {
            const response = await apiClient.get(me)
            console.log(response);
            return response
        } catch (e) {
            console.log(e);
            return false
        }
    }
}