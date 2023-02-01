import React from "react";
import { Button } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileUploadButton = ({ uploadInputRef, handleFileChange }) => {
  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        color="primary"
        startIcon={<InsertDriveFileIcon variant="filled" />}
        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
      >
        Upload File
      </Button>
    </>
  );
};

export default FileUploadButton;
