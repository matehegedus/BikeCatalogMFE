import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import NavBar from "./components/NavBar";
import MFELoader from "./components/MFELoader";
import { useMFERegistry } from "./hooks/useMFERegistry";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1a2e",
    },
    secondary: {
      main: "#e94560",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function GlobalLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default function App() {
  const { mfes, loading, error } = useMFERegistry(
    "http://localhost:4000/mfe-registry.json",
  );

  console.log(mfes, "mfes");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        {loading && <GlobalLoader />}
        {error && (
          <Box p={4} color="error.main">
            Failed to load MFE registry: {error.message}
          </Box>
        )}
        {!loading && !error && (
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              {mfes.map((mfe) => (
                <Route
                  key={mfe.name}
                  path={mfe.route === "/" ? "/" : `${mfe.route}/*`}
                  element={<MFELoader config={mfe} />}
                />
              ))}
            </Routes>
          </Suspense>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
