import { makeAutoObservable } from "mobx";
import { AlbumService } from "../service/albumService";

class AlbumStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getAlbums() {
    try {
      const response = await AlbumService.getAlbums();
      console.log(response);
      this.songs = response.data.songs;
    } catch (e) {
      console.log(e);
    }
  }

  async addAlbum(name, date, cover, songs) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("release_date", date);
      formData.append("cover", cover);
      const songFiles = []
      const songNames = []
      const songNumbers = []

      songs.forEach((song) => {
        songFiles.push(song.file)
        songNames.push(song.name)
        songNumbers.push(+song.trackNumber)
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
