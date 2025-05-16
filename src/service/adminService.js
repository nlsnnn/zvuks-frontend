import { apiClient } from "../api/apiClient";
import { blockUser, unblockUser } from "../config/constants";
import { handleApiError } from "../utils";

export class AdminService {
  static async blockUser(userId) {
    try {
      const res = await apiClient.post(blockUser + `/${userId}`);
      return res;
    } catch (e) {
      handleApiError(e, "блок");
    }
  }

  static async unblockUser(userId) {
    try {
      const res = await apiClient.post(unblockUser + `/${userId}`);
      return res;
    } catch (e) {
      handleApiError(e, "разблокировка");
    }
  }
}
