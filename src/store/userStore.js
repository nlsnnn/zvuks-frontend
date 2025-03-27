import { makeAutoObservable } from "mobx";
import { UserService } from "../service/userService";

class UserStore {
  user = null;

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
      // console.log(response);
      this.user = response.data;
      // console.log("auth");
      // console.log(this.user);
      // console.log(this.user.target);
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
}

export const userStore = new UserStore();
