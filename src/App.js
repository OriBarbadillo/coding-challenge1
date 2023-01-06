import React from "react";
import Home from "./views/Home";
import ListedPosts from "./views/listedPosts"; 
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='listedPosts' component={ListedPosts}></Route>
      </Routes>
    </Router>
    </>
  )
}
export default App;