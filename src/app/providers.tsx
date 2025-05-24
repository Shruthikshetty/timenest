"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "~/state-management/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// initialize the query client
const client = new QueryClient();

// this file has all the providers used by the app
const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}
        {/* this is just for dev purpose */}
        <ReactQueryDevtools initialIsOpen={false} />{" "}
      </QueryClientProvider>
    </Provider>
  );
};

export default CustomProvider;
