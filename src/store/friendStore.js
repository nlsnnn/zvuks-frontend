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
}

export const friendStore = new FriendStore();
