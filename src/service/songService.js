import { apiClient } from "../api/apiClient";
import { songs } from "../config/constants";

export class SongService {
  static async getSongs() {
    try {
      const response = await apiClient.get(songs);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
