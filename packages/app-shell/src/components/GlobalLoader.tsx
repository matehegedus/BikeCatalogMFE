import { Box, CircularProgress } from "@mui/material";
export default function GlobalLoader() {
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
