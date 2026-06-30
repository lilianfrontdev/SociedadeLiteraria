import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme.ts";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainHeader from "./components/MainHeader.tsx";
import Collection from "./pages/Collection/index.tsx";
import Login from "./pages/Login/index.tsx";

function Main() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <>
      {!hideHeader && <MainHeader />}
      <Routes>
        <Route path="/" element={<Collection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

export default Main;
