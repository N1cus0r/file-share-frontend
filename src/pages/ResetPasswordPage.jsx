import { Alert, Grid, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailPasswordForm from "../components/forms/EmailPasswordForm";
import PasswordResetForm from "../components/forms/PasswordResetForm";
import useAxiosApi from "../hooks/useAxiosApi";

const ResetPasswordPage = () => {
  const navigate = useNavigate("");
  const axiosApi = useAxiosApi();
  const { uid, token } = useParams();
  //Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //Helpers
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEmailSend = async () => {
    setLoading(true);
    await axiosApi
      .post("/users/get-password-reset-email", { email })
      .then((res) => {
        setSuccess(res.status === 200);
        setLoading(false);
      })
      .catch((e) => {
        setErrorMessage(e.response.data.email[0]);
        setLoading(false);
      });
  };

  const handlePasswordReset = async () => {
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords should match");
      return;
    }

    setLoading(true);
    await axiosApi
      .patch("/users/perform-password-reset", {
        uid,
        token,
        password,
      })
      .then((res) => {
        setSuccess(res.status === 200);
        setLoading(false);
        setTimeout(() => navigate("/"), 4000);
      })
      .catch((e) => setErrorMessage("Invalid data"));
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      direction="column"
      spacing={1}
    >
      <Grid item>
        {uid && token ? (
          <PasswordResetForm
            password={password}
            passwordConfirm={passwordConfirm}
            error={errorMessage}
            success={success}
            loading={loading}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
            setError={setErrorMessage}
            onClick={handlePasswordReset}
          />
        ) : (
          <EmailPasswordForm
            email={email}
            error={errorMessage}
            success={success}
            loading={loading}
            setEmail={setEmail}
            setError={setErrorMessage}
            onClick={handleEmailSend}
          />
        )}
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

export default ResetPasswordPage;
