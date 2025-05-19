import { apiClient } from "../api/apiClient";
import {
  listenSong,
  mostLikedSongs,
  newSongs,
  popularSongs,
  songs,
} from "../config/constants";

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

  static async getSong(id) {
    try {
      const response = await apiClient.get(songs + `${id}/`);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async addSong(data) {
    try {
      const response = await apiClient.post(songs, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async updateSong(id, data) {
    try {
      const response = await apiClient.patch(songs + `${id}/`, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async listen(songId) {
    try {
      const response = await apiClient.get(listenSong + songId);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getPopulars() {
    try {
      const response = await apiClient.get(popularSongs);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getNews() {
    try {
      const response = await apiClient.get(newSongs);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getMostLiked() {
    try {
      const response = await apiClient.get(mostLikedSongs);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async search(query) {
    try {
      const response = await apiClient.get(songs + "search", {
        params: { query: query },
      });
      return response.data;
    } catch (e) {
      return false;
    }
  }
}
