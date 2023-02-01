import {
  Alert,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import FacebookLoginButton from "../buttons/FacebookLoginButton";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Mail } from "@mui/icons-material";
import GoogleLoginButton from "../buttons/GoogleLoginButton";

const RegisterForm = ({
  email,
  firstName,
  lastName,
  password,
  errorMessage,
  message,
  loading,
  setEmail,
  setFirstName,
  setLastName,
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
          value={firstName}
          onChange={(e) => handleInputChange(e, setFirstName)}
          label="First Name"
          variant="filled"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={lastName}
          onChange={(e) => handleInputChange(e, setLastName)}
          label="Last Name (Optional)"
          variant="filled"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactPageIcon />
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
          fullWidth
          helperText="Do not share your password with anyone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item container direction="column" spacing={0.5}>
        <Grid item>
          <Button fullWidth onClick={handleFormSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
