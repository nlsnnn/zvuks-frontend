import { makeAutoObservable } from "mobx";
import { FriendService } from "../service/friendService";

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
}

export const friendStore = new FriendStore();
