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

      songs.forEach((song, index) => {
        formData.append(`songs[${index}].name`, song.name);
        formData.append(`songs[${index}].feats`, song.feats);
        formData.append(`songs[${index}].file`, song.file);
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
