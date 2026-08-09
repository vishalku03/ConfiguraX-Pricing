import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import App from "./App";

import { store } from "./store/store";
import { theme } from "./theme/theme";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
          >
            <App />
          </SnackbarProvider>

        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);