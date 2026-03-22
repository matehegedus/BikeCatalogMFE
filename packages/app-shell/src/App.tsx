import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import NavBar from "./components/NavBar";
import { useMFERegistry } from "./hooks/useMFERegistry";
import MFELoader from "./components/MFELoader";
import { theme } from "./theme";
import GlobalLoader from "./components/GlobalLoader";

export default function App() {
  const { mfes, loading, error } = useMFERegistry(
    "http://localhost:4000/mfe-registry.json",
  );

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
