import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Pages/Main";
import Search from "./components/Pages/Search";
import Selected from "./components/Pages/Selected";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/movie/:id" element={<Selected />} />
        <Route path="/tv/:id" element={<Selected />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
