import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import sendEmailAnimation from "../../animations/send-email.json";
import successAnimation from "../../animations/success.json";
import EmailIcon from "@mui/icons-material/Email";

const EmailPasswordForm = ({
  email,
  success,
  loading,
  setEmail,
  setError,
  onClick,
}) => {
  const handleInputChange = (e, setField) => {
    setError("");
    setField(e.target.value);
  };

  const emailAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: sendEmailAnimation,
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
                success ? successAnimationOptions : emailAnimationOptions
              }
            />
          }
        </Grid>
        {success ? (
          <Grid item>
            <Typography variant="h6">Email sent !</Typography>
            <Typography variant="body1">
              We've sent you instructions to reset your password on "{email}"
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="h6">Reset your password </Typography>
            <Typography variant="body1">
              We'll send you instructions to reset your password and get you
              back on track.
            </Typography>
          </Grid>
        )}

        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            disabled={loading || success}
            variant="filled"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            disabled={!Boolean(email) || loading || success}
            onClick={onClick}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailPasswordForm;
