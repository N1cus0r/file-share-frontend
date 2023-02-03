import React from "react";
import { Button } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileUploadButton = ({
  uploadInputRef,
  handleFileChange,
  fullWidth,
  children,
}) => {
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
        fullWidth={fullWidth}
        color="primary"
        startIcon={<InsertDriveFileIcon variant="filled" />}
        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
      >
        {children}
      </Button>
    </>
  );
};

export default FileUploadButton;
