import {
  Card,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import FileUploadLoading from "./FileUploadLoading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Lottie from "react-lottie";
import monkeyAnimation from "../animations/monkey.json";

const FileUploadResult = ({ loading, file, result }) => {
  const [copied, setCopied] = useState(false);
  const animationContainer = useRef(null);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: monkeyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
          p={3}
        >
          {loading ? (
            <Grid item>
              <FileUploadLoading file={file} />
            </Grid>
          ) : (
            <>
              <Grid item>
                <Lottie options={animationOptions} />
                <Box ref={animationContainer}></Box>
              </Grid>
              <Grid item>
                <Typography variant="h5">You're done !</Typography>
                <Typography variant="body1">
                  Copy your download link and share it with others
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  InputProps={{ readOnly: true }}
                  value={result?.url}
                />
              </Grid>
            </>
          )}
          <Grid item>
            <CopyToClipboard text={result?.url}>
              <Button
                startIcon={<ContentCopyIcon />}
                variant={copied ? "outlined" : "contained"}
                disabled={Boolean(loading) || Boolean(copied)}
                onClick={() => setCopied(true)}
              >
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item>
            <Link color="secondary" href="/" underline="none">
              <Typography variant="body2">Send another file ?</Typography>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default FileUploadResult;
