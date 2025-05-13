import { makeAutoObservable } from "mobx";
import { ArtistService } from "../service/artistService";

class ArtistStore {
  mySongs = [];
  myAlbums = [];
  dashboard = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMySongs() {
    const res = await ArtistService.getMySongs();
    this.mySongs = res.data;
  }

  async fetchMyAlbums() {
    const res = await ArtistService.getMyAlbums();
    this.myAlbums = res.data;
  }

  async fetchDashboard() {
    const res = await ArtistService.getDashboard();
    this.dashboard = res.data;
  }
}

export const artistStore = new ArtistStore();
