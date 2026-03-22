import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { bikes, categories, type BikeCategory } from "./data/bikes";
import BikeCard from "./components/BikeCard";

export default function CatalogApp() {
  const [activeCategory, setActiveCategory] = useState<BikeCategory | "All">(
    "All",
  );

  const filtered =
    activeCategory === "All"
      ? bikes
      : bikes.filter((b) => b.category === activeCategory);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 7,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Bike Catalog
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {bikes.length} models across {categories.length} disciplines. Find
            your ride.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Category filter */}
        <Stack alignItems="center" mb={5}>
          <ToggleButtonGroup
            value={activeCategory}
            exclusive
            onChange={(_, val) => val && setActiveCategory(val)}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <ToggleButton value="All" sx={{ px: 3, fontWeight: 600 }}>
              All
            </ToggleButton>
            {categories.map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{ px: 3, fontWeight: 600 }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        {/* Bike grid */}
        <Grid container spacing={3}>
          {filtered.map((bike) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={bike.id}
              sx={{ position: "relative" }}
            >
              <BikeCard bike={bike} />
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography color="text.secondary">
              No bikes in this category yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
