import { makeAutoObservable } from "mobx";
import { SongService } from "../service/songService";

class SongStore {
  songs = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getSongs() {
    try {
      const response = await SongService.getSongs();
      console.log(response);
      this.songs = response.data.songs;
    } catch (e) {
      console.log(e);
    }
  }

  async addSong(name, date, cover, song) {
    try {
      const form = new FormData()
      form.append("name", name)
      form.append("release_date", date)
      form.append("song", song)
      form.append("cover", cover)

      const response = await SongService.addSong(form)
      return response
    } catch (e) {
      console.log(e);
      return false
    }
  }

}

export const songStore = new SongStore();
