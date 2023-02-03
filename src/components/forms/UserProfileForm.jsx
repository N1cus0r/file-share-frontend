import React, { useRef } from "react";
import {
  Grid,
  Box,
  Card,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FileUploadButton from "../buttons/FileUploadButton";

const UserProfileForm = ({
  firstName,
  lastName,
  picture,
  pictureURL,
  loading,
  errorMessage,
  setFirstName,
  setLastName,
  setPicture,
  setPictureURL,
  setLoading,
  setErrorMessage,
  onClick,
}) => {
  const handleInputChange = (e, setField) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setField(e.target.value);
  };

  const uploadInputRef = useRef("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const picURL = URL.createObjectURL(file);

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setErrorMessage("File should be png or jpg !");
      return;
    }

    if (errorMessage) {
      setErrorMessage("");
    }

    setPicture(file);
    setPictureURL(picURL);
  };

  return (
    <Box width={300}>
      <Card sx={{ borderRadius: 10 }}>
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
            <Stack direction="row" spacing={2}>
              <Avatar src={pictureURL}>{firstName[0]}</Avatar>
              <FileUploadButton
                uploadInputRef={uploadInputRef}
                handleFileChange={handleFileChange}
                fullWidth={true}
              >
                Upload Avatar
              </FileUploadButton>
            </Stack>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="First Name"
              variant="filled"
              value={firstName}
              disabled={loading}
              onChange={(e) => handleInputChange(e, setFirstName)}
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
              fullWidth
              label="Last Name"
              variant="filled"
              value={lastName}
              disabled={loading}
              onChange={(e) => handleInputChange(e, setLastName)}
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
            <Button fullWidth disabled={loading} onClick={onClick}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default UserProfileForm;
