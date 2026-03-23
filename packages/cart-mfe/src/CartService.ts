/**
 * CartService
 *
 * Eagerly loaded by app-shell/bootstrap.tsx so this module is always alive from the beginning
 * (the cart MFE is loaded lazily, which is not enough, we need this in Shell for the header cart badge)
 *
 * Responsibilities:
 *  - Subscribe to cart:add / cart:remove on the shared event bus
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

  // rebuild snapshot before notifying, we will compare this to the previously cached one
  snapshot = [...items.values()];
  // tell each useCart() instance that data changed — they'll call getCartSnapshot() and re-render
  listeners.forEach((l) => l());
}

cartBus.subscribe("cart:add", (event) => {
  const existing = items.get(event.id);
  if (existing) {
    existing.quantity += event.quantity;
  } else {
    items.set(event.id, { ...event });
  }

  publishSummary();
});

cartBus.subscribe("cart:remove", (event) => {
  items.delete(event.id);
  publishSummary();
});

/**
 * .......
 * React-specific part for useCart
 * .......
 */

// one callback per useCart() instance — useSyncExternalStore registers here on mount, removes on unmount
let listeners: Array<() => void> = [];

export function subscribeToCart(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

let snapshot: CartItem[] = [];

// cached snapshot — we compare the snapshot within different timelines if the data got changed. if so, it will trigger useCart
export function getCartSnapshot(): CartItem[] {
  return snapshot;
}
