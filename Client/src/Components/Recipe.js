import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Recipe = () => {
  const App_Id = "cecb3810";
  const App_Key = "f18d80d8e4e8f24b8eff9c4a34cd8f77";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('Burger');

  useEffect(() => {
    const Api = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${App_Id}&app_key=${App_Key}`;

    axios.get(Api)
      .then(res => {
        const resData = res.data;
        const recipeData = resData.hits.map(hit => {
          const recipe = hit.recipe;
          const ingredients = recipe.ingredientLines;
          const instructions = recipe.url;
          return { ...recipe, ingredients, instructions };
        });
        setRecipes(recipeData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [search]);

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.elements.search.value);
  }

  return (
    <>
      <Header />
      <div className="bg-RecipeBg bg-cover bg-center h-60vh">
        <p className="text-5xl text-center pt-20 text-black">Find a recipe</p>
        <form onSubmit={handleSearch} className="text-center">
          <input type="text" className="search bg-white border border-gray-300 rounded px-3 py-2 w-96 focus:outline-none focus:ring focus:border-blue-300" id="search" defaultValue="" />
          <button type="submit" className="searchBtn bg-blue-500 text-white rounded-full px-5 py-2 ml-2">
            <i className="fas fa-search search-icon"></i>
          </button>
        </form>
      </div>
      <div className="recipe-card-grid flex flex-wrap justify-between">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card border border-gray-300 rounded p-4 w-1/4 m-2 text-center shadow-md hover:transform hover:-translate-y-2 cursor-pointer">
            <img src={recipe.image} alt={recipe.label} className="recipe-image max-w-full h-auto rounded" />
            <div className="recipe-label text-2xl my-2">{recipe.label}</div>
            <div className="recipe-ingredients">
              <h3 className="font-semibold">Ingredients:</h3>
              <ul className="text-left">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-base">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions mt-4">
              <h3 className="font-semibold">Instructions:</h3>
              <a href={recipe.instructions} className="text-blue-500 hover:underline block">Link to Instructions</a>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Recipe;
