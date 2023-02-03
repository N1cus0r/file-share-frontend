import {
  Card,
  Grid,
  Box,
  Button,
  TextField,
  Chip,
  Typography,
  Divider,
} from "@mui/material";
import React, { useRef } from "react";
import FileUploadButton from "../buttons/FileUploadButton";

const FileUploadForm = ({
  file,
  title,
  message,
  setFile,
  setTitle,
  setMessage,
  handleSubmit,
}) => {
  const uploadInputRef = useRef("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          <Grid item display="flex" justifyContent="center" alignItems="center">
            {file ? (
              <Chip
                label={
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 220,
                    }}
                  >
                    {file.name}
                  </Typography>
                }
                onDelete={() => setFile(null)}
              />
            ) : (
              <FileUploadButton
                uploadInputRef={uploadInputRef}
                handleFileChange={handleFileChange}
              >
                Upload File
              </FileUploadButton>
            )}
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <TextField
              variant="standard"
              label="Title"
              size="small"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="standard"
              label="Message"
              size="small"
              fullWidth
              multiline
              maxRows={4}
              minRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              disabled={!Boolean(file)}
              onClick={handleSubmit}
            >
              Get Link
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default FileUploadForm;
