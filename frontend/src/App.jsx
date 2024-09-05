// import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="QuizPage" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
