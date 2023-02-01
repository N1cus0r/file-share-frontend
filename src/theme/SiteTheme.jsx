import { createTheme, CssBaseline, ThemeProvider, colors } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const ColorModeContext = createContext();

const SiteTheme = ({ children }) => {
  const [mode, setMode] = useState(
    LocalStorageAPI.getLocalStorageTheme() || "light"
  );

  const changeColorMode = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === "light" ? "dark" : "light";
      LocalStorageAPI.setLocalStorageTheme(nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: colors.blue["A400"],
          },
          secondary: {
            main: colors.grey[500],
          },
          black: {
            main: colors.grey[900],
          },
          white: {
            main: colors.grey[200],
          },
          blue: {
            main: colors.lightBlue[800],
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, changeColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default SiteTheme;
