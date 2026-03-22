import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Box, Grid, Paper, Typography } from "@mui/material";

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

export default function FeatureList() {
  return (
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
            <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
              {f.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
