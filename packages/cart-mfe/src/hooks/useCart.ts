import { useSyncExternalStore } from "react";
import { subscribeToCart, getCartSnapshot } from "../CartService";

/**
 * Bridge between CartService (a plain JS singleton) and React's render cycle.
 *
 * CartService lives outside of React — it can't use Context or state.
 * This hook lets React components read from it and automatically re-render
 * whenever the cart changes.
 *
 * How it works:
 *  1. On mount, React passes its own internal callback to subscribeToCart, which stores it in CartService's listeners list.
 *  2. When the cart changes, CartService calls all stored listeners — triggering that React callback.
 *  3. React then calls getCartSnapshot() and compares the result to its previously cached snapshot —
 *     similar to how useMemo compares current and previous dependency values.
 *     If they differ, React re-renders the component with the new cart items.
 *     CartService always returns a new array reference on change, so this comparison reliably detects updates.
 *  4. On unmount, the callback is removed from CartService's listener list.
 */
export function useCart() {
  return useSyncExternalStore(subscribeToCart, getCartSnapshot);
}
