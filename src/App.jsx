import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './components/Pages/MainPage'
import './App.css'
import { LoginPage } from './components/Pages/LoginPage/LoginPage'
import { RegisterPage } from './components/Pages/RegisterPage/RegisterPage'
import { Logout } from './components/Pages/Logout'
import { FriendsPage } from './components/Pages/FriendsPage/FriendsPage'
import { ChatsPage } from './components/Pages/ChatsPage/ChatsPage'
import { ErrorPage } from './components/Pages/ErrorPage/ErrorPage'
import { AddSongPage } from './components/Pages/AddSongPage'
import { AddAlbumPage } from './components/Pages/AddAlbumPage'
import { AlbumPage } from './components/Pages/AlbumPage'
import { FavoriteSongsPage } from './components/Pages/FavoriteSongsPage'
import { FavoriteAlbumsPage } from './components/Pages/FavoriteAlbumsPage'
import { ProfilePage } from './components/Pages/ProfilePage'
import { ProfileRedirect } from './components/Profile/ProfileRedirect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/friends' element={<FriendsPage />} />
        <Route path='/chats' element={<ChatsPage />} />
        <Route path='/chats/:userId' element={<ChatsPage />} />
        <Route path='/add-song' element={<AddSongPage />} />
        <Route path='/add-album' element={<AddAlbumPage />} />
        <Route path='/album/:albumId' element={<AlbumPage />} />
        <Route path='/favorite/songs' element={<FavoriteSongsPage />} />
        <Route path='/favorite/albums' element={<FavoriteAlbumsPage />} />
        <Route path='/user/:userId' element={<ProfilePage />} />
        <Route path='/profile' element={<ProfileRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
