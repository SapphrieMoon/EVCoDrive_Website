import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { ThemeProvider } from "./providers/theme-provider.tsx"
import { AppProvider } from "@/contexts/app.context";

if (import.meta.env.VITE_USE_MOCK === "true") {
  await import("./mocks");
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ThemeProvider>
            <App />
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
