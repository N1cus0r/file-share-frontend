import { Button } from "@mui/material";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from "@mui/icons-material/Facebook";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const FacebookLoginButton = () => {
  const { socialLogin } = useAuth();
  const [mode, setColorMode] = useTheme();

  const responseFacebook = (response) => {
    socialLogin(response.accessToken, "facebook", response.email);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields="name,email,picture"
      autoLoad={false}
      disableMobileRedirect={true}
      callback={responseFacebook}
      render={(renderProps) => (
        <Button
          fullWidth
          color={mode === "light" ? "black" : "white"}
          startIcon={<FacebookIcon fontSize="small" color="blue" />}
          onClick={renderProps.onClick}
        >
          Continue with facebook
        </Button>
      )}
    />
  );
};

export default FacebookLoginButton;
