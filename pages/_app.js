import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "../utils/Store";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps:{ session, ...pageProps} },) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Toaster />
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
