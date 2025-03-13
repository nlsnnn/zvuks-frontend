import { makeAutoObservable } from "mobx";
import { FriendService } from "../service/friendService";
import { UserService } from "../service/userService";

class FriendStore {
  friends = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getFriends() {
    try {
      const response = await FriendService.getFriends();
      this.friends = response.data.friends;
    } catch (e) {
      console.log(e);
    }
  }

  async getPending() {
    try {
      const response = await FriendService.getPendings();
      this.friends = response.data.requests;
    } catch (e) {
      console.log(e);
    }
  }

  async getSended() {
    try {
      const response = await FriendService.getSended();
      this.friends = response.data.requests;
    } catch (e) {
      console.log(e);
    }
  }

  async searchUsers(query) {
    try {
      const response = await UserService.searchUsers(query);
      this.friends = response.data.users;
    } catch (e) {
      console.log(e);
    }
  }

  async sendRequest(id) {
    try {
      const data = {
        "user_received_id": id
      }
      const response = await FriendService.sendRequest(data)
      return response
    } catch (e) {
      console.log(e);
    }
  }

  async acceptRequest(id) {
    try {
      const data = {
        "user_sended_id": id
      }
      const response = await FriendService.acceptRequest(data);
    } catch (e) {
      console.log(e);
    }
  }

  async rejectRequest(id) {
    try {
      const data = {
        "user_sended_id": id
      }
      const response = await FriendService.rejectRequest(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFriend(id) {
    try {
      const data = {
        "user_id": id
      }
      const response = await FriendService.deleteFriend(data);
    } catch (e) {
      console.log(e);
    }
  }

}

export const friendStore = new FriendStore();
