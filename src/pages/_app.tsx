import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../redux/StoreProvider";
import { PrivyProvider } from "@privy-io/react-auth";

import AuthContextProvider from "../context/AuthProvider";
import { OrbisProvider } from "../context/chat/DirectMessages/DirectMessages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <PrivyProvider
        appId={"clnejhprf03ctk00f6jwbwunp"}
        config={{
          loginMethods: ["email"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            // logo: "https://your-logo-url",
          },
          embeddedWallets: {
            noPromptOnSignature: true, // defaults to false
          },
        }}
      >
        <AuthContextProvider>
          <OrbisProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={2000} />
          </OrbisProvider>
        </AuthContextProvider>
      </PrivyProvider>
    </StoreProvider>
  );
};

export default MyApp;
