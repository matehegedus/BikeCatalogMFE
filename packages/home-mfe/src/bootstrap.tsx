/**
 * Standalone bootstrap – only used when the MFE is run in isolation
 * (i.e. directly at http://localhost:3001 for local development).
 * When loaded by the app-shell via Module Federation, main.tsx is
 * the entry point and this file is NOT invoked.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomeApp from "./HomeApp";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeApp />
    </ThemeProvider>
  </React.StrictMode>,
);
