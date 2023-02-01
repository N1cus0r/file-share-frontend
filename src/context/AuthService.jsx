import React, { createContext } from "react";
import useAxiosApi from "../hooks/useAxiosApi";
import useAxiosApiAuth from "../hooks/useAxiosApiAuth";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const AuthServiceContext = createContext();

const AuthService = ({ children }) => {
  const axiosApiAuth = useAxiosApiAuth();
  const axiosApi = useAxiosApi();

  const setUserObj = async (email, accessToken) => {
    await axiosApi
      .get("/users/get-user-info", {
        params: { email },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const user = {
          email: res.data.email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          picture: res.data.picture,
        };
        LocalStorageAPI.setLocalStorageUser(user);
      })
      .catch((e) => console.log(e));
  };

  const setTokenObj = async (email, password, setErrorMessage, setLoading) => {
    await axiosApiAuth
      .post("token", {
        username: email,
        password,
        grant_type: "password",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      })
      .then((res) => {
        const tokens = {
          access: res.data.access_token,
          refresh: res.data.refresh_token,
        };
        LocalStorageAPI.setLocalStorageTokens(tokens);
      });
  };

  const context = {
    setUserObj,
    setTokenObj,
  };

  return (
    <AuthServiceContext.Provider value={context}>
      {children}
    </AuthServiceContext.Provider>
  );
};

export default AuthService;
