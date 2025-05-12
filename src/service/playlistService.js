import { apiClient } from "../api/apiClient";
import { playlist, playlistSong, playlistUser } from "../config/constants";

export class PlaylistService {
  static async get(id) {
    try {
      const response = await apiClient.get(playlist + `/${id}/`);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async create(data) {
    try {
      const response = await apiClient.post(playlist, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async update(id, data) {
    try {
      const response = await apiClient.patch(playlist + `/${id}/`, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async delete(id) {
    try {
      const response = await apiClient.delete(playlist + `/${id}/`);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getUser(userId) {
    try {
      const response = await apiClient.get(playlistUser + `/${userId}/`);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async addSong(data) {
    try {
      const response = await apiClient.post(playlistSong, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async removeSong(data) {
    try {
      const response = await apiClient.delete(playlistSong, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
