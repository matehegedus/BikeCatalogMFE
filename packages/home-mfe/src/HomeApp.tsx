/**
 * HomeApp – exposed module: './HomeApp'
 *
 * Bike brand landing page. Showcases the brand story, tagline and values.
 * This component is the contract boundary with the app-shell: its props
 * should remain stable, any internal implementation can change freely.
 */
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const features = [
  {
    icon: <SpeedIcon fontSize="large" color="secondary" />,
    title: "Performance First",
    description:
      "Every frame, component and geometry is engineered for maximum speed without sacrificing control.",
  },
  {
    icon: <BuildIcon fontSize="large" color="secondary" />,
    title: "Handcrafted Quality",
    description:
      "Each bike is assembled by our master builders with meticulous attention to detail and precision.",
  },
  {
    icon: <EmojiEventsIcon fontSize="large" color="secondary" />,
    title: "Race Proven",
    description:
      "Born on the track, tested in the championships, available to you. Our DNA is pure competition.",
  },
];

export default function HomeApp() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          color: "white",
          py: { xs: 8, md: 14 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            <DirectionsBikeIcon sx={{ fontSize: 56, color: "#e94560" }} />
          </Stack>
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{ letterSpacing: "-0.03em" }}
          >
            FAAST-BIKES
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "rgba(255,255,255,0.75)", mb: 4, fontWeight: 300 }}
          >
            Precision. Power. Pure Passion.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 560,
              mx: "auto",
              mb: 5,
              lineHeight: 1.8,
            }}
          >
            Since 2026, FAAST-BIKES has been crafting high-performance bikes for
            riders who refuse to settle. From criterium racers to endurance
            machines — we build bikes that become an extension of you.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            href="/catalog"
            sx={{ fontWeight: 700, px: 5, py: 1.5, borderRadius: 2 }}
          >
            Explore Our Bikes
          </Button>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
          Why FAAST-BIKES?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          sx={{ maxWidth: 480, mx: "auto" }}
        >
          When Passion meets expertise
        </Typography>
        <Grid container spacing={4}>
          {features.map((f) => (
            <Grid item xs={12} md={4} key={f.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box mb={2}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {f.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  lineHeight={1.8}
                >
                  {f.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA banner */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ready to ride?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}
          >
            Browse our full range of bikes and find your perfect match.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="/catalog"
            sx={{ borderRadius: 2, px: 5, fontWeight: 700 }}
          >
            View the Catalog
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
