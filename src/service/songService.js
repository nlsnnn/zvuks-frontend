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

  static async addSong(data) {
    try {
      const response = await apiClient.post(songs, data)
      return response
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
