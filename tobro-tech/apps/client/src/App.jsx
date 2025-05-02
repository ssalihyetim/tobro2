import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Placeholder for service detail pages */}
      <Route path="/services/:slug" element={<div style={{padding:'2rem',textAlign:'center'}}>Service details coming soon.</div>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
