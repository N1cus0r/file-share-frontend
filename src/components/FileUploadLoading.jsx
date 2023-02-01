import { Grid, CircularProgress, Typography } from "@mui/material";
import React from "react";

const FileUploadLoading = ({ file }) => {
  return (
    <Grid container direction="column" textAlign="center" alignItems="center">
      <Grid item>
        <CircularProgress size={100} />
      </Grid>
      <Grid item>
        <Typography variant="h6">Transferring...</Typography>
        {file && (
          <Typography variant="body2" color="secondary">
            File Size: {(file?.size / 1000).toFixed(1)} KB
          </Typography>
        )}
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default FileUploadLoading;
