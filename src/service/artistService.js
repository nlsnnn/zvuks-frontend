import { apiClient } from "../api/apiClient";
import { artistAlbums, artistSongs } from "../config/constants";

export class ArtistService {
  static async getMySongs() {
    return await apiClient.get(artistSongs);
  }

  static async getSongInfo(id, days = 90) {
    return await apiClient.get(artistSongs + `/${id}?days=${days}`);
  }

  static async getMyAlbums() {
    return await apiClient.get(artistAlbums);
  }

  static async getAlbumInfo(id, days = 90) {
    return await apiClient.get(artistAlbums + `/${id}?days=${days}`);
  }

  static async getDashboard() {
    return await apiClient.get("/artist/me");
  }
}
