import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const UserIconButton = ({
  user,
  anchorElUser,
  closeUserMenu,
  openUserMenu,
}) => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    closeUserMenu();
    logoutUser();
  };

  const handleProfileClick = () => {
    closeUserMenu();
    navigate("profile");
  };

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
        keepMounted
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={closeUserMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Stack direction="row" spacing={1}>
            <AccountCircleIcon />
            <Typography textAlign="center">Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <Stack direction="row" spacing={1}>
            <LogoutIcon />
            <Typography textAlign="center">Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserIconButton;
