/**
 * main.tsx – entry point.
 *
 * The async import of bootstrap.tsx is the Module Federation "async boundary".
 * It ensures that shared modules (react, react-dom, MUI…) have been negotiated
 * and loaded before the app renders. Without it, shared singletons can fail to
 * initialise correctly when federation is in play.
 */
import("./bootstrap");
