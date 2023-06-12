import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { Simulation } from "./pages/Simulation";
import { FormSimulation } from "./pages/FormSimulation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Cadastro />}/>
        <Route path="/home" element={<Simulation />}/>
        <Route path="/form" element={<FormSimulation />}/>
      </Routes>
    </Router>
  )
}