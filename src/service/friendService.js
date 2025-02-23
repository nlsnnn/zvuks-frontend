import { apiClient } from "../api/apiClient";

export class FriendService {
  static async getFriends() {
    try {
      const response = await apiClient.get("/friends");
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
