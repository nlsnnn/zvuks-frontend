import { makeAutoObservable } from "mobx";
import { UserService } from "../service/userService";

class UserStore {
  user = null;
  userProfile = null;
  isCheckingAuth = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async login(identifier, password) {
    try {
      const response = await UserService.login({
        identifier: identifier,
        password: password,
      });
      this.user = response;
    } catch (e) {
      throw e;
    }
  }

  async register(email, username, password) {
    try {
      await UserService.register({
        email: email,
        username: username,
        password: password,
      });
      return true;
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    try {
      await UserService.logout();
      this.user = null;
    } catch (e) {
      throw e;
    }
  }

  async resetPasswordRequest(email) {
    const response = await UserService.resetPasswordRequest({
      email: email,
    });
    return response;
  }

  async resetPasswordConfirm(token, newPassword) {
    const response = await UserService.resetPasswordConfirm({
      token: token,
      newPassword: newPassword,
    });
    return response;
  }

  async checkAuth() {
    this.isCheckingAuth = true;
    try {
      const response = await UserService.getMe();
      this.user = response.data;
    } catch (e) {
      this.user = null;
    } finally {
      this.isCheckingAuth = false;
    }
  }

  async getUsers(query) {
    try {
      const response = await UserService.searchUsers(query);
      return response.data.users;
    } catch (e) {
      throw e;
    }
  }

  async getProfile(userId) {
    try {
      const response = await UserService.getProfile(userId);
      this.userProfile = response.data;
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async updateProfile(avatar) {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await UserService.updateProfile(formData);
      return response;
    } catch (e) {
      return false;
    }
  }
}

export const userStore = new UserStore();
