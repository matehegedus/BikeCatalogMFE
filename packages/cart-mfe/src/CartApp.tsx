import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "./hooks/useCart";
import { cartBus } from "@bike-catalog/event-bus";

export default function CartApp() {
  const cartItems = useCart();

  return (
    <Stack p={2}>
      <Typography variant="h5">Your Cart:</Typography>

      <Stack gap={2} direction={"row"} flexWrap={"wrap"}>
        {cartItems.map((cartItem) => {
          return (
            <Card
              key={cartItem.id}
              variant="outlined"
              sx={{
                width: 400,
              }}
            >
              <CardHeader title={cartItem.name} />
              <CardContent>
                <Stack direction="column">
                  <Stack direction="row" alignItems="baseline">
                    <Typography variant="h6">Amount:</Typography>
                    <Typography variant="subtitle1">
                      {cartItem.quantity}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="baseline">
                    <Typography variant="h6">Price per item:</Typography>
                    <Typography variant="subtitle1">
                      {cartItem.price}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="baseline">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="subtitle1">
                      {cartItem.price * cartItem.quantity}
                    </Typography>
                  </Stack>
                  <Button
                    onClick={() => {
                      cartBus.publish("cart:remove", { id: cartItem.id });
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
}
