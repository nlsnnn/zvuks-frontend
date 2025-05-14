import { makeAutoObservable } from "mobx";
import { ArtistService } from "../service/artistService";
import { SongService } from "../service/songService";
import { toast } from "react-toastify";

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

  async archiveSong(id) {
    const res = await SongService.updateSong(id, { archive: true });
    if (!res) return toast.error("Не удалось скрыть песню");
    this.mySongs.find((song) => song.id === id).archive = true;
  }

  async unarchiveSong(id) {
    const res = await SongService.updateSong(id, { archive: false });
    if (!res) return toast.error("Не удалось восстановить песню");
    this.mySongs.find((song) => song.id === id).archive = false;
  }
}

export const artistStore = new ArtistStore();
