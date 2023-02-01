import { useContext } from "react";
import { AuthServiceContext } from "../context/AuthService";

const useAuthService = () => {
  return useContext(AuthServiceContext);
};

export default useAuthService;
