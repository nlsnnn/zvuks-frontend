import { apiClient } from "../api/apiClient";
import { album, albums, albumSongs } from "../config/constants";

export class AlbumService {
  static async getAlbum(albumId) {
    try {
      console.log(album(albumId));
      const response = await apiClient.get(album(albumId))
      console.log(response);
      return response
    } catch (e) {
      console.log(e);
      return false
    }
  }

  static async getAlbums() {
    try {
      const response = await apiClient.get(albums);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getAlbumSongs(albumId) {
    try {
      const response = await apiClient.get(albumSongs(albumId))
      return response
    } catch (e) {
      console.log(e);
      return false
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
