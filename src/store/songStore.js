import { makeAutoObservable } from "mobx";
import { Howler, Howl } from "howler";
import { SongService } from "../service/songService";

class SongStore {
  songs = [];
  currentSongIndex = -1;
  currentHowl = null;
  volume = 1;
  currentTime = 0;
  duration = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get currentSong() {
    return this.songs[this.currentSongIndex];
  }

  get isPlaying() {
    return this.currentHowl?.playing() || false;
  }

  setVolume(value) {
    this.volume = value / 100;
    Howler.volume(this.volume);
  }

  updateTime() {
    if (this.currentHowl) {
      this.currentTime = this.currentHowl.seek();
      requestAnimationFrame(() => this.updateTime());
    }
  }

  // Перемотка
  seek(time) {
    if (this.currentHowl) {
      this.currentHowl.seek(time);
      this.currentTime = time;
    }
  }

  playSong(index) {
    if (index < 0 || index >= this.songs.length) return;

    if (index === this.currentSongIndex) {
      // TODO вынести отсюда
      this.currentHowl.pause();
      return;
    }

    if (this.currentHowl) {
      this.currentHowl.stop();
      this.currentHowl.unload();
    }

    this.currentSongIndex = index;
    const song = this.songs[index];

    this.currentHowl = new Howl({
      src: song.path,
      loop: false,
      autoplay: true,
      volume: this.volume,
      onend: () => this.playNext(),
      onload: () => {
        this.duration = this.currentHowl.duration();
      },
    });

    this.currentHowl.on("play", () => {
      this.updateTime();
    });
  }

  playNext() {
    if (this.currentSongIndex < this.songs.length - 1) {
      this.playSong(this.currentSongIndex + 1);
    }
  }

  playPrevious() {
    if (this.currentSongIndex > 0) {
      this.playSong(this.currentSongIndex - 1);
    }
  }

  togglePlay() {
    if (this.currentHowl) {
      this.currentHowl.playing()
        ? this.currentHowl.pause()
        : this.currentHowl.play();
    }
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
      const form = new FormData();
      form.append("name", name);
      form.append("release_date", date);
      form.append("song", song);
      form.append("cover", cover);

      const response = await SongService.addSong(form);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const songStore = new SongStore();
