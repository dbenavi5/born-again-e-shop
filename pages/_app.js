import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, title, ...pageProps } }) {
  const renderLayout = Component.getLayout ?? ((page) => <Layout title={title}>{page}</Layout>);
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Toaster />
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              {renderLayout(<Component {...pageProps} />)}
            </Auth>
          ) : (
            renderLayout(<Component {...pageProps} />)
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}

export default MyApp;
