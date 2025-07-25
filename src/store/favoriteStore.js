import { makeAutoObservable } from "mobx";
import { FavoriteService } from "../service/favoriteService";

class FavoriteStore {
  songs = [];
  albums = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getSongs() {
    const response = await FavoriteService.getSongs();
    console.log(response);
    this.songs = response.data;
  }

  async getAlbums() {
    const response = await FavoriteService.getAlbums();
    this.albums = response.data;
  }

  async addSong(songId) {
    const data = {
      song_id: songId,
    };
    await FavoriteService.addSong(data);
  }

  async addAlbum(albumId) {
    const data = {
      album_id: albumId,
    };
    await FavoriteService.addAlbum(data);
  }

  async removeSong(songId) {
    const data = {
      song_id: songId,
    };
    console.log(data);
    await FavoriteService.removeSong(data);
  }

  async removeAlbum(albumId) {
    const data = {
      album_id: albumId,
    };
    await FavoriteService.removeAlbum(data);
  }

  async toggleSong(song) {
    if (song.favorite) {
      favoriteStore.removeSong(song.id);
      song.favorite = false;
    } else {
      favoriteStore.addSong(song.id);
      song.favorite = true;
    }
  }

  async toggleAlbum(album) {
    if (album.favorite) {
      favoriteStore.removeAlbum(album.id);
      album.favorite = false;
    } else {
      favoriteStore.addAlbum(album.id);
      album.favorite = true;
    }
  }
}

export const favoriteStore = new FavoriteStore();
