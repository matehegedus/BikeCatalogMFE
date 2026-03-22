/**
 * CatalogApp – exposed module: './CatalogApp'
 *
 * Displays the full range of VeloForge bikes with category filtering.
 * Extend this component as the catalog grows – add detail pages,
 * basket integration, or filters without touching the app-shell.
 */
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { bikes, categories, type Bike, type BikeCategory } from "./data/bikes";

const badgeColor: Record<string, "success" | "warning" | "error"> = {
  New: "success",
  "Best Seller": "warning",
  Limited: "error",
};

function BikeCard({ bike }: { bike: Bike }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
      }}
    >
      {/* Placeholder image area */}
      <Box
        sx={{
          height: 180,
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <DirectionsBikeIcon
          sx={{ fontSize: 80, color: "rgba(255,255,255,0.15)" }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ position: "absolute", top: 12, right: 12 }}
        >
          <Chip
            label={bike.category}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: 600,
            }}
          />
          {bike.badge && (
            <Chip
              label={bike.badge}
              size="small"
              color={badgeColor[bike.badge]}
              sx={{ fontWeight: 700 }}
            />
          )}
        </Stack>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {bike.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          lineHeight={1.7}
          mb={2}
        >
          {bike.description}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={0.5}>
          {Object.entries(bike.specs).map(([key, value]) => (
            <Stack key={key} direction="row" justifyContent="space-between">
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textTransform="capitalize"
              >
                {key.replace(/([A-Z])/g, " $1")}
              </Typography>
              <Typography
                variant="caption"
                color="text.primary"
                textAlign="right"
                maxWidth="55%"
              >
                {value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Box flexGrow={1}>
          <Typography variant="h6" fontWeight={800} color="secondary.main">
            €{bike.price.toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ fontWeight: 700, borderRadius: 2 }}
        >
          Configure
        </Button>
      </CardActions>
    </Card>
  );
}

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
