import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './components/Pages/MainPage'
import './App.css'
import { LoginPage } from './components/Pages/LoginPage/LoginPage'
import { RegisterPage } from './components/Pages/RegisterPage/RegisterPage'
import { Logout } from './components/Pages/Logout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
