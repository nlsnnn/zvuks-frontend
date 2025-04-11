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
