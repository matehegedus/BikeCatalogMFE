import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Eagerly boot the cart service so cart:add events are captured from the
// moment the app loads — regardless of whether /cart has been visited yet.
import("cartMFE/CartService").catch(() => {
  // Non-fatal: cart badge simply won't update if the remote is unavailable.
  console.warn("[app-shell] CartService could not be loaded.");
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
