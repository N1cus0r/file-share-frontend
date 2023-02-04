import { Alert, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const UserProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const user = LocalStorageAPI.getLocalStorageUser();
  //inputs
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [picture, setPicture] = useState(user.picture);
  const [pictureURL, setPictureURL] = useState(user?.picture);
  //helpers
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //security
  const [uid, setUid] = useState(null);

  useEffect(() => {
    async function getEncodedUID() {
      await axiosPrivate
        .get("users/get-encoded-uid", { params: { email: user?.email } })
        .then((res) => {
          setUid(res.data);
        })
        .catch((e) => console.log(e));
    }
    getEncodedUID();
  }, []);

  const handleFormSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (pictureURL !== user.picture) {
      formData.append("picture", picture, picture.name);
    }

    await axiosPrivate
      .patch("users/edit-profile", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = res.data;
        const editedUser = {
          email: user.email,
          firstName: data?.first_name ? data?.first_name : user.firstName,
          lastName: data?.last_name ? data?.last_name : user.lastName,
          picture: data?.picture ? data?.picture : user.picture,
        };
        LocalStorageAPI.setLocalStorageUser(editedUser);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
      spacing={3}
    >
      <Grid item>
        <UserProfileForm
          firstName={firstName}
          lastName={lastName}
          picture={picture}
          pictureURL={pictureURL}
          loading={loading}
          errorMessage={errorMessage}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPicture={setPicture}
          setPictureURL={setPictureURL}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          onClick={handleFormSubmit}
        />
      </Grid>
      {loading && (
        <Grid item sx={{ width: 280 }}>
          <LinearProgress color="primary" />
        </Grid>
      )}
      {errorMessage && (
        <Grid item>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default UserProfilePage;
