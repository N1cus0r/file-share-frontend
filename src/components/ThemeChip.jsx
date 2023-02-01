import { Chip } from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useTheme from "../hooks/useTheme";

const ThemeChip = () => {
  const [mode, changeColorMode] = useTheme();
  return (
    <Chip
      label={mode}
      icon={mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      onClick={changeColorMode}
    />
  );
};

export default ThemeChip;
