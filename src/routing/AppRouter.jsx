import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import AuthProvider from "../context/AuthProvider";
import AuthService from "../context/AuthService";
import AccountActivationPage from "../pages/AccountActivationPage";
import DownloadPage from "../pages/DownloadPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UserProfilePage from "../pages/UserProfilePage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <AuthService>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="downloads/:code" element={<DownloadPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="password-reset/:uid/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="activate-account/:uid"
              element={<AccountActivationPage />}
            />
            <Route
              path="password-reset-email"
              element={<ResetPasswordPage />}
            />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AuthService>
  );
};

export default AppRouter;
