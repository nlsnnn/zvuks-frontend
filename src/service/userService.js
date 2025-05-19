import { apiClient } from "../api/apiClient";
import {
  login,
  register,
  me,
  logout,
  search,
  profile,
  updateProfile,
  passwordResetRequest,
  passwordResetConfirm,
  subscribeUser,
  unsubscribeUser,
} from "../config/constants";
import { handleApiError } from "../utils";

export class UserService {
  static async login(data) {
    try {
      const response = await apiClient.post(login, data);
      return response.data;
    } catch (e) {
      handleApiError(e, "вход");
    }
  }

  static async register(data) {
    try {
      const response = await apiClient.post(register, data);
      return response.data;
    } catch (e) {
      handleApiError(e, "регистрация");
    }
  }

  static async logout() {
    try {
      const response = await apiClient.post(logout);
    } catch (e) {
      handleApiError(e, "выход");
    }
  }

  static async resetPasswordRequest(data) {
    try {
      const response = await apiClient.post(passwordResetRequest, data);
      return response.data;
    } catch (e) {
      handleApiError(e, "запрос восстановления пароля");
    }
  }

  static async resetPasswordConfirm(data) {
    try {
      const response = await apiClient.post(passwordResetConfirm, data);
      return response.data;
    } catch (e) {
      handleApiError(e, "подтверждение восстановления пароля");
    }
  }

  static async getMe() {
    try {
      const response = await apiClient.get(me);
      return response;
    } catch (e) {
      return false;
    }
  }

  static async searchUsers(query) {
    try {
      const response = await apiClient.get(search + `?query=${query}`);
      console.log(response);
      return response;
    } catch (e) {
      handleApiError(e, "поиск пользователей");
    }
  }

  static async getProfile(userId) {
    try {
      const response = await apiClient.get(profile(userId));
      return response;
    } catch (e) {
      handleApiError(e, "получение профиля");
    }
  }

  static async updateProfile(data) {
    try {
      const response = await apiClient.post(updateProfile, data);
      return response;
    } catch (e) {
      handleApiError(e, "обновление профиля");
    }
  }

  static async subscribe(userId) {
    try {
      const response = await apiClient.post(subscribeUser + `/${userId}`)
      return response
    } catch (e) {
      handleApiError(e, "подписка")
    }
  }

  static async unsubscribe(userId) {
    try {
      const response = await apiClient.post(unsubscribeUser + `/${userId}`)
      return response
    } catch (e) {
      handleApiError(e, "отписка")
    }
  }
}
