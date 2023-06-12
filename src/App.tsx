import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import "./styles/toast.css";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";
import { Logger } from "./utils/logger.util";
import { useEffect } from "react";
import DashBoardLayout from "./pages/dashboard";
import ComposeNote from "./pages/dashboard/Compose";
import { removeLocalStorage } from "./utils/storage";

function App() {
  const { checkLogin, isAuthenticated } = useAuth();
  const logger = new Logger("App");
  window.onbeforeunload = function () {
    removeLocalStorage("access_token");
  };
  useEffect(() => {
    checkLogin();
    logger.info("App initialized");
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<></>}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/mynotes"
            element={
              <RequireAuth>
                <DashBoardLayout />
              </RequireAuth>
            }
          >
            <Route path="" />

            <Route
              path="compose"
              element={
                <RequireAuth>
                  <ComposeNote />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
