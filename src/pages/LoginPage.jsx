import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import useAuth from "../hooks/useAuth";
import FormFilled from "../utils/validators/FormFilled";
import RegisterForm from "../components/forms/RegisterForm";
import { Grid, LinearProgress } from "@mui/material";

const LoginPage = () => {
  const { loginUser, registerUser } = useAuth();

  //Form State
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  //Loading State
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e, newValue) => {
    setFormType(newValue);
  };

  const handleLoginFormSubmit = () => {
    const formValid = FormFilled(email, password);
    if (!formValid) {
      setErrorMessage("Please fill in the form");
      return;
    }

    loginUser(email, password, setErrorMessage, setLoading);
  };

  const handleRegisterFormSubmit = () => {
    const formValid = FormFilled(email, firstName, password);
    if (!formValid) {
      setErrorMessage("Please fill in the form");
      return;
    }

    registerUser(
      email,
      firstName,
      lastName,
      password,
      setErrorMessage,
      setMessage,
      setLoading
    );
  };

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      direction="column"
      spacing={1}
    >
      <Grid item>
        <TabContext value={formType}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleFormChange} variant="fullWidth">
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </TabList>
          </Box>
          <TabPanel value="login">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleLoginFormSubmit}
            />
          </TabPanel>
          <TabPanel value="register">
            <RegisterForm
              email={email}
              firstName={firstName}
              lastName={lastName}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleRegisterFormSubmit}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      {loading && (
        <Grid item sx={{ width: 280 }}>
          <LinearProgress color="primary" />
        </Grid>
      )}
    </Grid>
  );
};

export default LoginPage;
