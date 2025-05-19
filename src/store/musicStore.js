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
    if (songs) {
      this.searchResultsSongs = Array.isArray(songs) ? songs : [songs];
    } else {
      this.searchResultsSongs = [];
    }
  }
}

export const musicStore = new MusicStore();
