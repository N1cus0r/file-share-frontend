import {
  Alert,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import FacebookLoginButton from "../buttons/FacebookLoginButton";
import KeyIcon from "@mui/icons-material/Key";
import { Mail } from "@mui/icons-material";
import GoogleLoginButton from "../buttons/GoogleLoginButton";

const LoginForm = ({
  email,
  password,
  errorMessage,
  message,
  loading,
  setEmail,
  setPassword,
  setErrorMessage,
  handleFormSubmit,
}) => {
  const handleInputChange = (e, setField) => {
    if (errorMessage) setErrorMessage("");
    setField(e.target.value);
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item textAlign="center">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Grid>
      {message && (
        <Grid item>
          <Alert severity="info">{message}</Alert>
        </Grid>
      )}
      <Grid item>
        <GoogleLoginButton />
      </Grid>
      <Grid item>
        <FacebookLoginButton />
      </Grid>
      <Grid item>
        <Divider>
          <Typography color="secondary">Or better yet...</Typography>
        </Divider>
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
          type="email"
          label="Email"
          variant="filled"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          type="password"
          label="Password"
          variant="filled"
          helperText="Do not share your password with anyone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={0.5}>
          <Grid item>
            <Button fullWidth onClick={handleFormSubmit}>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Link
              color="secondary"
              underline="none"
              href="password-reset-email/"
            >
              <Typography variant="body2">Forgot Password ?</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
