import { Box, Container, Typography, Button, Stack } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FeatureList from "./components/FeatureList";

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
            <DirectionsBikeIcon color="secondary" sx={{ fontSize: 56 }} />
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
        <FeatureList />
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
