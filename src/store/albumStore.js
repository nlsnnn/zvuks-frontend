import { makeAutoObservable } from "mobx";
import { AlbumService } from "../service/albumService";

class AlbumStore {
  album = null;
  albums = [];
  albumSongs = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getAlbum(albumId) {
    try {
      const response = await AlbumService.getAlbum(albumId);
      console.log(response.data);
      this.album = response.data.album;
    } catch (e) {
      console.log(e);
    }
  }

  async getAlbums() {
    try {
      const response = await AlbumService.getAlbums();
      console.log(response);
      this.albums = response.data.albums;
    } catch (e) {
      console.log(e);
    }
  }

  async getAlbumSongs(albumId) {
    this.loading = true;
    try {
      const response = await AlbumService.getAlbumSongs(albumId);
      this.albumSongs = response.data.songs;
    } catch (e) {
      this.error = "Ошибка при получении песен альбома"
    } finally {
      this.loading = false;
    }
  }

  async addAlbum(name, date, cover, songs) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("release_date", date);
      formData.append("cover", cover);
      const songFiles = [];
      const songNames = [];
      const songNumbers = [];

      songs.forEach((song) => {
        songFiles.push(song.file);
        songNames.push(song.name);
        songNumbers.push(+song.trackNumber);
      });
      songs.forEach((song, index) => {
        formData.append(`songs`, song.file);
        formData.append(`song_names`, song.name);
        formData.append(`track_numbers`, song.trackNumber.toString());
      });

      const response = await AlbumService.addAlbum(formData);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const albumStore = new AlbumStore();
