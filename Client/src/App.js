import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import Recipe from "./Components/Recipe";
import Profile from "./Components/Profile";
import SavedRecipes from "./Components/SavedRecipe";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import AboutUs from "./Components/AboutUs";
import Error404 from "./Components/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="saved" element={<SavedRecipes/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;