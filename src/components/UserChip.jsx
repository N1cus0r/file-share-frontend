import React, { useState } from "react";
import { Chip, Avatar, Menu, Button } from "@mui/material";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";

const UserChip = () => {
  const { logoutUser } = useAuth();
  const user = LocalStorageAPI.getLocalStorageUser();
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);

  const handleChipClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        label={user?.firstName}
        variant="outlined"
        color="primary"
        avatar={<Avatar src={user?.picture}>{user?.firstName[0]}</Avatar>}
        onClick={handleChipClick}
      />
      <Menu elevation={0} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
      </Menu>
    </>
  );
};

export default UserChip;
