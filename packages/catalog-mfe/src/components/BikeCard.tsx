import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Bike } from "../data/bikes";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const badgeColor: Record<string, "success" | "warning" | "error"> = {
  New: "success",
  "Best Seller": "warning",
  Limited: "error",
};

export default function BikeCard({ bike }: { bike: Bike }) {
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
