import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosApi from "../hooks/useAxiosApi";
import useAxiosApiAuth from "../hooks/useAxiosApiAuth";
import useAuthService from "../hooks/useAuthService";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const axiosApiAuth = useAxiosApiAuth();
  const axiosApi = useAxiosApi();
  const { setTokenObj, setUserObj } = useAuthService();

  const registerUser = async (
    email,
    first_name,
    last_name,
    password,
    setErrorMessage,
    setMessage,
    setLoading
  ) => {
    setLoading(true);
    await axiosApi
      .post("users/create-user", {
        email,
        first_name,
        last_name,
        password,
      })
      .then((res) => {
        setMessage(`We've sent an email to activate your account on ${email}`);
      })
      .catch((e) => {
        if (setErrorMessage) {
          setErrorMessage("Email already in use");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logoutUser = () => {
    LocalStorageAPI.delLocalStorageTokens();
    LocalStorageAPI.delLocalStorageUser();
    return navigate("/login");
  };

  const loginUser = async (email, password, setErrorMessage, setLoading) => {
    try {
      setLoading(true);
      await setTokenObj(email, password, setErrorMessage, setLoading);
      await setUserObj(email, LocalStorageAPI.getLocalStorageTokens().access);
      return navigate("/");
    } catch (e) {
      setErrorMessage("User account not found or inactive");
      setLoading(false);
    }
  };

  const socialLogin = async (token, backend, email) => {
    axiosApiAuth
      .post("convert-token", {
        token,
        backend,
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      })
      .then(async (res) => {
        const tokens = {
          access: res.data.access_token,
          refresh: res.data.refresh_token,
        };
        LocalStorageAPI.setLocalStorageTokens(tokens);
        await setUserObj(email, LocalStorageAPI.getLocalStorageTokens().access);

        return navigate("/");
      });
  };

  const context = {
    registerUser,
    logoutUser,
    loginUser,
    socialLogin,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
