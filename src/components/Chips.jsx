import { Grid } from "@mui/material";
import React from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import ThemeChip from "./ThemeChip";
import UserChip from "./UserChip";

const Chips = () => {
  const user = LocalStorageAPI.getLocalStorageUser();

  return (
    <Grid container direction="row" justifyContent="flex-end" p={4} spacing={2}>
      <Grid item>
        <ThemeChip />
      </Grid>
      {user && (
        <Grid item>
          <UserChip />
        </Grid>
      )}
    </Grid>
  );
};

export default Chips;
