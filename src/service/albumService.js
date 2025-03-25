import { apiClient } from "../api/apiClient";
import { albums } from "../config/constants";

export class AlbumService {
  static async getAlbums() {
    try {
      const response = await apiClient.get(albums);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async addAlbum(data) {
    try {
      const response = await apiClient.post(albums, data)
      return response
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
