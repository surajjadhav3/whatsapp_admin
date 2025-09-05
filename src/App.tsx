import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/Toast";
import AppRouter from "./router/AppRouter";
import "./App.css";
import { HealthCheckProvider } from './features/health/providers/HealthCheckProvider';

const App: React.FC = () => {
  return (
    <HealthCheckProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ThemeProvider>
    </HealthCheckProvider>
  );
};

export default App;
