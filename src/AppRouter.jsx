import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ViewerPage from "./pages/ViewerPage";
import BadgesPage from "./pages/BadgesPage";
import VaultPage from "./pages/VaultPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/vault" element={<VaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
