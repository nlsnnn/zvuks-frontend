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

}

export const songStore = new SongStore();
