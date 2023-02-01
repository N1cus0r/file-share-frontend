import axios from "axios";

const useAxiosApiAuth = () => {
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL + "/auth/";
  const axiosApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosApi;
};

export default useAxiosApiAuth;
