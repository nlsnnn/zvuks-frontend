import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./components/Pages/Home";
import { Friends } from "./components/Pages/Friends";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
