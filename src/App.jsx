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
import { ResetPassword } from "./components/Pages/ResetPassword";
import { ResetPasswordConfirm } from "./components/Pages/ResetPasswordConfirm";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/confirm/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
