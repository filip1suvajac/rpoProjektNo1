import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { GameProvider } from "./context/GameContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GameProvider>
    <App />
  </GameProvider>
);

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
