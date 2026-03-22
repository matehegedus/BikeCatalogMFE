/**
 * CartService — headless, no UI.
 *
 * Eagerly loaded by app-shell/bootstrap.tsx so this module is always alive,
 * regardless of whether the user has visited /cart.
 *
 * Responsibilities:
 *  - Subscribe to cart:add / cart:remove on the shared event bus
 *  - Maintain cart state as a module-level Map (survives route changes)
 *  - Publish cart:updated summary after every state change
 */
import { cartBus } from "@bike-catalog/event-bus";
import type { CartEvent } from "@bike-catalog/event-bus";

type CartItem = CartEvent & { quantity: number };

const items = new Map<string, CartItem>();

function publishSummary() {
  let count = 0;
  let total = 0;
  for (const item of items.values()) {
    count += item.quantity;
    total += item.price * item.quantity;
  }
  cartBus.publish("cart:updated", { count, total });
}

cartBus.subscribe("cart:add", (event) => {
  const existing = items.get(event.id);
  if (existing) {
    existing.quantity += event.quantity;
  } else {
    items.set(event.id, { ...event });
  }

  console.log("items", items);
  publishSummary();
});

cartBus.subscribe("cart:remove", (event) => {
  items.delete(event.id);
  publishSummary();
});
