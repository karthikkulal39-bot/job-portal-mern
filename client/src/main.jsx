import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Toaster} from 'sonner'
import 'bootstrap/dist/css/bootstrap.min.css'
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Toaster closeButton/>
      <App />
       <ReactQueryDevtools initialIsOpen={false} />
    </StrictMode>
  </QueryClientProvider>,
);
