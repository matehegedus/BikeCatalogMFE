import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Badge,
  IconButton,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate, useLocation } from "react-router-dom";
import { cartBus } from "@bike-catalog/event-bus";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Catalog", path: "/catalog" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartSummary, setCartSummary] = useState({ count: 0, total: 0 });

  useEffect(() => {
    const handler = (summary: { count: number; total: number }) => {
      setCartSummary(summary);
    };
    cartBus.subscribe("cart:updated", handler);
    return () => cartBus.unsubscribe("cart:updated", handler);
  }, []);

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsBikeIcon sx={{ mr: 1, color: "secondary.main" }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            BikeCatalog
          </Typography>
          <Box>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                onClick={() => navigate(link.path)}
                sx={{
                  mx: 0.5,
                  fontWeight: location.pathname === link.path ? 700 : 400,
                  borderBottom:
                    location.pathname === link.path
                      ? "2px solid"
                      : "2px solid transparent",
                  borderColor: "secondary.main",
                  borderRadius: 0,
                  pb: "2px",
                }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartSummary.count} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
