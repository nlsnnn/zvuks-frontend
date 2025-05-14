import { makeAutoObservable } from "mobx";
import { Howler, Howl } from "howler";
import { SongService } from "../service/songService";

class SongStore {
  songs = [];
  popularSongs = [];
  newSongs = [];
  currentSongIndex = -1;
  currentHowl = null;
  volume = 1;
  currentTime = 0;
  duration = 0;
  isPlaying = false;

  constructor() {
    makeAutoObservable(this);
  }

  get currentSong() {
    return this.songs[this.currentSongIndex];
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

    if (index === this.currentSongIndex && this.isPlaying) {
      this.currentHowl.pause();
      return;
    } else if (index === this.currentSongIndex && !this.isPlaying) {
      this.currentHowl.play();
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
      html5: true,
      onend: () => this.playNext(),
      onplay: () => {
        this.isPlaying = true;
      },
      onpause: () => {
        this.isPlaying = false;
      },
      onstop: () => {
        this.isPlaying = false;
      },
      onload: () => {
        this.duration = this.currentHowl.duration();
      },
    });

    this.currentHowl.on("play", () => {
      this.updateTime();
    });

    this.listen(song.id);
  }

  playSingleSong(song) {
    this.songs = [song];
    this.currentSongIndex = 0;
    this.playSong(0);
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
      this.isPlaying = !this.isPlaying;
      this.currentHowl.playing()
        ? this.currentHowl.pause()
        : this.currentHowl.play();
    }
  }

  loadOtherSongs(songs) {
    this.songs = songs;
    this.currentSongIndex = -1;
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

  async getSong(id) {
    try {
      const response = await SongService.getSong(id);
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async addSong(name, date, artists, cover, song) {
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("releaseDate", date);
      form.append("artistIds", artists);
      form.append("song", song);
      form.append("cover", cover);

      const response = await SongService.addSong(form);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateSong(id, data) {
    try {
      const response = await SongService.updateSong(id, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async listen(songId) {
    SongService.listen(songId);
  }

  async getPopulars() {
    const response = await SongService.getPopulars();
    this.popularSongs = response.data;
  }

  async getNews() {
    const response = await SongService.getNews();
    this.newSongs = response.data;
  }
}

export const songStore = new SongStore();
