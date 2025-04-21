import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
