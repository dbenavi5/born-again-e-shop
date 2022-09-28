import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Toaster/>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
