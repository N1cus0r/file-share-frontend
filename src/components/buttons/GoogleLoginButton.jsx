import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const GoogleLoginButton = ({ setLoading }) => {
  const { socialLogin } = useAuth();
  const [mode, setColorMode] = useTheme();

  const responseGoogle = (response) => {
    socialLogin(
      response.accessToken,
      "google-oauth2",
      response.profileObj.email
    );
  };

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_APP_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_ID}
        render={(renderProps) => {
          const sendRequest = renderProps.onClick;

          const handleClick = () => {
            setLoading(true);
            sendRequest();
          };

          return (
            <Button
              fullWidth
              color={mode === "light" ? "black" : "white"}
              startIcon={<FcGoogle fontSize="small" color="blue" />}
              onClick={handleClick}
            >
              Continue With Google
            </Button>
          );
        }}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
