import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
