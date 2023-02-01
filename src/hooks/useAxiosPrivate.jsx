import axios from "axios";
import { useEffect } from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import useAuth from "./useAuth";
import useAxiosApiAuth from "./useAxiosApiAuth";

const useAxiosPrivate = () => {
  const { logoutUser } = useAuth();
  const axiosApiAuth = useAxiosApiAuth();
  const tokens = LocalStorageAPI.getLocalStorageTokens();
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosInstance = axios.create({
    baseURL,
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${tokens?.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevConfig = error?.config;
        if (error.response.status === 401 && !prevConfig?.sent) {
          await axiosApiAuth
            .post("token", {
              grant_type: "refresh_token",
              client_id: process.env.REACT_APP_CLIENT_ID,
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
              refresh_token: tokens?.refresh,
            })
            .then((res) => {
              const tokens = {
                access: res.data.access_token,
                refresh: res.data.refresh_token,
              };
              LocalStorageAPI.setLocalStorageTokens(tokens);

              prevConfig.headers.Authorization = `Bearer ${tokens.access}`;
              return;
            })
            .catch((e) => {
              logoutUser();
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [tokens]);

  return axiosInstance;
};

export default useAxiosPrivate;
