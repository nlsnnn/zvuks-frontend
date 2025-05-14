import { makeAutoObservable } from "mobx";
import { SongService } from "../service/songService";

class MusicStore {
  searchResultsSongs = [];
  searchResultsAlbums = [];

  constructor() {
    makeAutoObservable(this);
  }

  async searchAll(query) {
    const songs = await SongService.search(query);
    this.searchResultsSongs = Array.isArray(songs) ? songs : [songs];
    console.log(this.searchResultsSongs);
  }
}

export const musicStore = new MusicStore();
