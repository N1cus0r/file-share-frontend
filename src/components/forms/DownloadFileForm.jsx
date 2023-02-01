import {
  Card,
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import { saveAs } from "file-saver";
import Lottie from "react-lottie";
import fileAnimation from "../../animations/file.json";
import Scrollbars from "react-custom-scrollbars";

const DownloadFileForm = ({ title, message, fileURL }) => {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: fileAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleDownload = async () => {
    const fileName = fileURL.split("/").slice(-1);
    await fetch(fileURL, { method: "GET" })
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, fileName));
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
            <Lottie options={animationOptions} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Ready when you are</Typography>
            <Typography variant="body2" color="secondary">
              Transfer expires in 24 hours
            </Typography>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="body1">{title}</Typography>
          </Grid>
          {message && (
            <Grid item textAlign="left">
              <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={100}>
                <Typography variant="body2">{message}</Typography>
              </Scrollbars>
            </Grid>
          )}
          <Grid item>
            <Button variant="contained" onClick={handleDownload}>
              Download
            </Button>
          </Grid>
          <Grid item>
            <Link href="/" underline="none">
              <Typography variant="body2" color="secondary">
                Want to send a file ?
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DownloadFileForm;
