export const baseURL = "http://localhost:8000";

// Users
export const login = "/auth/login/";
export const register = "/auth/register/";
export const logout = "/auth/logout/";
export const me = "/auth/me/";
export const search = "/auth/user/search/";
export const profile = (userId) => `/auth/user/profile/${userId}`;
export const updateProfile = "auth/user/update";
export const passwordResetRequest = "/auth/password-reset";
export const passwordResetConfirm = "/auth/password-reset/confirm";

// Friends
export const friends = "/friends";
export const pending = "/friends/pending";
export const sended = "/friends/sended";
export const accept = "/friends/accept";
export const reject = "/friends/reject";
export const deleteFriend = "/friends/delete";

// Chat
export const messages = "/chat/messages/";
export const websocketURL = "ws://127.0.0.1:8000/chat/ws/";

// Song
export const songs = "/music/song/";

export const albums = "/music/album";
export const album = (albumId) => `/music/album/${albumId}`;
export const albumSongs = (albumId) => `/music/album/${albumId}/songs`;

// Favorite
export const favoriteSong = "/music/favorite/song";
export const favoriteAlbum = "/music/favorite/album";

// Recommendations
const recommendations = "/music/recommendations";
export const popularSongs = recommendations + "/popular/songs";
export const listenSong = recommendations + "/listen/";
export const newSongs = recommendations + "/new/songs";

// Playlist
export const playlist = "/music/playlist";
export const playlistSong = "/music/playlist/song/";
export const playlistUser = "/music/playlist/user/";
