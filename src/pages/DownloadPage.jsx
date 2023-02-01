import { Card, CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DownloadFileForm from "../components/forms/DownloadFileForm";
import useAxiosApi from "../hooks/useAxiosApi";

const DownloadPage = () => {
  const axiosApi = useAxiosApi();
  const { code } = useParams();
  //Data State
  const [fileURL, setFileURL] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getData() {
      axiosApi
        .get("files/get-data-instance", {
          params: { code },
        })
        .then((res) => {
          setFileURL(res.data.file);
          setTitle(res.data.title);
          setMessage(res.data.message);
        });
    }

    getData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Grid item>
        <DownloadFileForm title={title} message={message} fileURL={fileURL} />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default DownloadPage;
