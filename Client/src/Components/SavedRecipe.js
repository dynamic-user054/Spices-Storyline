import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Fetch saved recipes for the logged-in user
    axios.get('http://localhost:8080/saved-recipes')
      .then(res => {
        const savedRecipesData = res.data; // Adjust this based on your server response
        setSavedRecipes(savedRecipesData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="bg-RecipeBg bg-cover bg-center h-60vh">
        <p className="text-5xl text-center pt-20 text-black">Saved Recipes</p>
      </div>
      <div className="recipe-card-grid flex flex-wrap justify-between">
        {savedRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card border border-gray-300 rounded p-4 w-1/4 m-2 text-center shadow-md">
            {/* Display saved recipe details here */}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SavedRecipes;
