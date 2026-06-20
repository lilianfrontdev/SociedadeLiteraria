import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHeader from "./components/MainHeader.tsx";
import Collection from "./pages/Collection/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <MainHeader/>
        <Routes>
          <Route path="/" element={<Collection/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
