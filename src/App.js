import React from "react";
import Home from "./views/Home";
import ListedPosts from "./views/ListedPosts"; 
import NewPost from "./views/NewPost";
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/ListedPosts' element={<ListedPosts />}></Route>
        <Route path='/NewPost' element={<NewPost />}></Route>
      </Routes>
    </Router>
    </>
  )
}
export default App;