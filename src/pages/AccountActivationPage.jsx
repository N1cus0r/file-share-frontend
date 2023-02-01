import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosApi from "../hooks/useAxiosApi";

const AccountActivationPage = () => {
  const axiosApi = useAxiosApi();
  const { uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosApi.patch("/users/activate-account", { uid }).then((res) => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  });

  return;
};

export default AccountActivationPage;
