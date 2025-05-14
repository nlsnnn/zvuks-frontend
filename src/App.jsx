import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./components/Pages/Home";
import { Friends } from "./components/Pages/Friends";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";
import { ResetPassword } from "./components/Pages/ResetPassword";
import { ResetPasswordConfirm } from "./components/Pages/ResetPasswordConfirm";
import { Profile } from "./components/Pages/Profile";
import { ProfileRedirect } from "./components/Pages/redirect/ProfileRedirect";
import { Album } from "./components/Pages/Album";
import { AddSong } from "./components/Pages/AddSong";
import { AddAlbum } from "./components/Pages/AddAlbum";
import { Favorite } from "./components/Pages/Favorite";
import { Chat } from "./components/Pages/Chat";
import { EditProfile } from "./components/Pages/EditProfile";
import { NotFound } from "./components/Pages/NotFound";
import { ArtistDashboard } from "./components/Pages/ArtistDashboard";
import { ArtistSongStats } from "./components/Pages/ArtistSongStats";
import { ArtistAlbumStats } from "./components/Pages/ArtistAlbumStats";
import { ArtistManageMusic } from "./components/Pages/ArtistManageMusic";
import { EditSong } from "./components/Pages/EditSong";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password/confirm/:token"
          element={
            <GuestRoute>
              <ResetPasswordConfirm />
            </GuestRoute>
          }
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileRedirect />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            }
          />
          <Route path="/album/:albumId" element={<Album />} />
          <Route
            path="/songs/add"
            element={
              <ProtectedRoute>
                <AddSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/albums/add"
            element={
              <ProtectedRoute>
                <AddAlbum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorite />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist"
            element={
              <ProtectedRoute>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/songs/:id"
            element={
              <ProtectedRoute>
                <ArtistSongStats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/albums/:id"
            element={
              <ProtectedRoute>
                <ArtistAlbumStats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/manage"
            element={
              <ProtectedRoute>
                <ArtistManageMusic />
              </ProtectedRoute>
            }
          />

          <Route
            path="/songs/edit/:id"
            element={
              <ProtectedRoute>
                <EditSong />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <Playlists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists/add"
            element={
              <ProtectedRoute>
                <AddPlaylist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={
              <ProtectedRoute>
                <PlaylistDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists/:playlistId/edit"
            element={
              <ProtectedRoute>
                <EditPlaylist />
              </ProtectedRoute>
            }
          /> */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
