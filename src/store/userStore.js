import { makeAutoObservable } from "mobx";
import { UserService } from "../service/userService";

class UserStore {
  user = null;
  userProfile = null;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async login(email, password) {
    try {
      const response = await UserService.login({
        email: email,
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

  async checkAuth() {
    try {
      const response = await UserService.getMe();
      this.user = response.data;
    } catch (e) {
      this.user = null;
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
      const formData = new FormData()
      formData.append("avatar", avatar)
      const response = await UserService.updateProfile(formData)
      return response
    } catch (e) {
      return false
    }
  }
}

export const userStore = new UserStore();
