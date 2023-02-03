import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { Stack } from "@mui/system";
import useTheme from "../hooks/useTheme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import UserIconButton from "./buttons/UserIconButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(LocalStorageAPI.getLocalStorageUser());
  const [mode, changeColorMode] = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const closeUserMenu = (e) => {
    setAnchorElUser(null);
  };

  const openUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  useEffect(() => {
    const userChange = () => {
      setUser(LocalStorageAPI.getLocalStorageUser());
    };

    window.addEventListener("storage", userChange);

    return () => {
      window.removeEventListener("storage", userChange);
    };
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          color="inherit"
          edge="start"
          onClick={() => navigate("/")}
        >
          <CloudIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="a"
          noWrap
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
          onClick={() => navigate("/")}
        >
          File Share
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
          <Tooltip
            title={
              mode === "light" ? "Turn off the light" : "Turn on the light"
            }
          >
            <IconButton
              size="large"
              color="inherit"
              edge="start"
              onClick={changeColorMode}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          {user && (
            <UserIconButton
              user={user}
              anchorElUser={anchorElUser}
              closeUserMenu={closeUserMenu}
              openUserMenu={openUserMenu}
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
