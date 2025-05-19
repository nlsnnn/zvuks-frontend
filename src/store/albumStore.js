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
      this.error = "Ошибка при получении песен альбома";
    } finally {
      this.loading = false;
    }
  }

  async addAlbum(
    title,
    releaseDate,
    cover,
    songFiles,
    songNames,
    trackNumbers,
    songArtistsIds,
    notifyUsers
  ) {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("releaseDate", releaseDate);
      formData.append("cover", cover);

      songFiles.forEach((file) => formData.append("songs", file));
      songNames.forEach((name) => formData.append("songNames", name));
      trackNumbers.forEach((num) =>
        formData.append("trackNumbers", num.toString())
      );
      formData.append("songArtistsIds", JSON.stringify(songArtistsIds));
      formData.append("notifySubscribers", notifyUsers)

      console.log(songArtistsIds);


      const response = await AlbumService.addAlbum(formData);

      return response;
    } catch (e) {
      console.error("Ошибка при создании альбома:", e);
      return false;
    }
  }
}

export const albumStore = new AlbumStore();
