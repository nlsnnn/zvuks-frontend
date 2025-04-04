import { apiClient } from "../api/apiClient";
import { accept, deleteFriend, friends, pending, reject, sended } from "../config/constants";

export class FriendService {
  static async getFriends() {
    try {
      const response = await apiClient.get("/friends");
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getPendings() {
    try {
      const response = await apiClient.get(pending);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getSended() {
    try {
      const response = await apiClient.get(sended);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async acceptRequest(data) {
    try {
      const response = await apiClient.post(accept, data)
      return response
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async rejectRequest(data) {
    try {
      const response = await apiClient.post(reject, data)
      return response
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async sendRequest(data) {
    try {
      const response = await apiClient.post(friends, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async deleteFriend(data) {
    try {
      const response = await apiClient.post(deleteFriend, data)
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
