import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import { HashRouter } from "react-router-dom";
import App from "./App";
import store from "./store";

// ✅ Fix spacing issue
const theme = createTheme();


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StyledEngineProvider injectFirst>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
          <ToastContainer position="bottom-center" autoClose={5000} />
        </Provider>
      </ThemeProvider>
    </HashRouter>
  </StyledEngineProvider>
);
