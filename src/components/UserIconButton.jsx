import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";

const UserIconButton = ({
  user,
  anchorElUser,
  closeUserMenu,
  openUserMenu,
}) => {
  const { logoutUser } = useAuth();

  return (
    <>
      <Tooltip title={user?.firstName}>
        <IconButton onClick={openUserMenu}>
          <Avatar color="inherit" src={user?.picture}>
            {user?.firstName[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(anchorElUser)}
        onClose={closeUserMenu}
      >
        <MenuItem onClick={logoutUser}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserIconButton;
