import { Grid } from "@mui/material";
import React, { useState } from "react";
import FileUploadResult from "../components/FileUploadResult";
import FileUploadForm from "../components/forms/FileUploadForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const HomePage = () => {
  const axiosPrivate = useAxiosPrivate();
  //Shared Data State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  //Extra State
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("file", file, file.name);
    await axiosPrivate
      .post("files/upload-data", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      {/* <Grid item>
        <Chips />
      </Grid> */}
      <Grid item>
        {loading || result ? (
          <FileUploadResult loading={loading} file={file} result={result} />
        ) : (
          <FileUploadForm
            file={file}
            title={title}
            message={message}
            setFile={setFile}
            setTitle={setTitle}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
