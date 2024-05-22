import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from "./Application";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}
