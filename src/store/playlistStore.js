import { makeAutoObservable } from "mobx";
import { PlaylistService } from "../service/playlistService";

class PlaylistStore {
  songs = [];
  albums = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getPlaylist(id) {
    const response = await PlaylistService.get(id);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async getUserPlaylists(userId) {
    const response = await PlaylistService.getUser(userId);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async addPlaylist(data) {
    const response = await PlaylistService.create(data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async updatePlaylist(id, data) {
    const response = await PlaylistService.update(id, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async deletePlaylist(id) {
    const response = await PlaylistService.delete(id);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async addSong(playlistId, songId) {
    const data = {
      playlist_id: playlistId,
      song_id: songId,
    };
    const response = await PlaylistService.addSong(data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }

  async removeSong(playlistId, songId) {
    const data = {
      playlist_id: playlistId,
      song_id: songId,
    };
    const response = await PlaylistService.removeSong(data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  }
}

export const playlistStore = new PlaylistStore();
