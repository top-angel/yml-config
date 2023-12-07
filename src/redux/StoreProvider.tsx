import type { ReactNode } from "react";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import { PrivyProvider } from "@privy-io/react-auth";

interface Props {
  children: ReactNode;
}
let persistor = persistStore(store);

export default function StoreProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
