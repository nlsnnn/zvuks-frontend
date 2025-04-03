import { apiClient } from "../api/apiClient";
import { favoriteAlbum, favoriteSong } from "../config/constants";

export class FavoriteService {
  static async getSongs() {
    try {
      const response = await apiClient.get(favoriteSong);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getAlbums() {
    try {
      const response = await apiClient.get(favoriteAlbum);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async addSong(data) {
    try {
      const response = await apiClient.post(favoriteSong, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async addAlbum(data) {
    try {
      const response = await apiClient.post(favoriteAlbum, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async removeSong(data) {
    try {
      const response = await apiClient.delete(favoriteSong, {
        data: data
      });
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async removeAlbum(data) {
    try {
      const response = await apiClient.delete(favoriteAlbum, {
        data: data,
      });
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
