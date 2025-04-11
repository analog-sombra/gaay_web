"use client";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <HydrationBoundary state={pageProps.dehydratedState}> */}
        {children}
        {/* </HydrationBoundary> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
