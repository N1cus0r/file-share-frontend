import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import passwordResetAnimation from "../../animations/password-reset.json";
import successAnimation from "../../animations/success.json";
import KeyIcon from "@mui/icons-material/Key";

const PasswordResetForm = ({
  password,
  passwordConfirm,
  success,
  loading,
  setPassword,
  setPasswordConfirm,
  setError,
  onClick,
}) => {
  const handleFieldChange = (e, setField) => {
    setError("");
    setField(e.target.value);
  };

  const passwordAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: passwordResetAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const successAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box width={300}>
      <Grid
        container
        direction="column"
        display="flex"
        justifyContent="center"
        textAlign="center"
        spacing={2}
        p={2}
      >
        <Grid item>
          {
            <Lottie
              options={
                success ? successAnimationOptions : passwordAnimationOptions
              }
            />
          }
        </Grid>
        <Grid item>
          <Typography variant="h6">Reset your password </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="filled"
            label="New password"
            type="password"
            disabled={loading || success}
            value={password}
            onChange={(e) => handleFieldChange(e, setPassword)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="filled"
            label="Confirm new password"
            type="password"
            disabled={loading || success}
            value={passwordConfirm}
            onChange={(e) => handleFieldChange(e, setPasswordConfirm)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button onClick={onClick} fullWidth disabled={loading || success}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PasswordResetForm;
