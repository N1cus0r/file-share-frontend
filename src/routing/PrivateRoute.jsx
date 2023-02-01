import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const PrivateRoute = () => {
  const tokens = LocalStorageAPI.getLocalStorageTokens();

  return tokens ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
