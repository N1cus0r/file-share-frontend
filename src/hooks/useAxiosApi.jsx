import axios from "axios";

const useAxiosApi = () => {
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosApi;
};

export default useAxiosApi;
