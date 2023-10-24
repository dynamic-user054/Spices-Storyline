import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Header/>
      <div className="bg-about-us">
        <div className="about-us-container py-10 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-200">
          <div className="about-us-content text-center mb-8">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-xl leading-6">
              Welcome to Spices Storyline! This Website is made on a React.js project. It contains the Main Page (Home Page) and the About Us Page you are currently viewing. The recipe content is sourced from the Edamam RecipeSearch API. This project features login and signup functionality, with error handling for empty fields. User credentials are stored in a 'credentials.json' file.
            </p>
            <p className="text-xl leading-6">
              It all started with a shared love for food and a desire to make cooking accessible to everyone. Our founder, Prabhat Singh Thakur, began this journey with a simple vision: to create a platform where food enthusiasts could find a wide range of recipes, cooking tips, and submit their own recipes. In 2023, Spices Storyline was born, and we haven't looked back since.
            </p>
          </div>
          <div className="about-us-features text-center">
            <h3 className="text-2xl mb-4 text-gray-600">What Sets Us Apart:</h3>
            <ul className="text-xl">
              <li className="mb-4">
                <strong>Diverse Recipe Collection:</strong> Our extensive collection of recipes spans cuisines from around the world. From quick and easy weeknight meals to gourmet dishes fit for special occasions, we've got you covered.
              </li>
              <li className="mb-4">
                <strong>Expertise & Guidance:</strong> Our team of seasoned chefs and food experts curate and create recipes with care. You'll find step-by-step instructions to help you master the art of cooking.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;