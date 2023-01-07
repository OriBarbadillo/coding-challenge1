import React from "react";
import Home from "./views/Home";
import ListedPosts from "./views/ListedPosts"; 
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/ListedPosts' element={<ListedPosts />}></Route>
      </Routes>
    </Router>
    </>
  )
}
export default App;