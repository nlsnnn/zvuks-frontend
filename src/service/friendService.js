import { apiClient } from "../api/apiClient";
import { pending, sended } from "../config/constants";

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
}
