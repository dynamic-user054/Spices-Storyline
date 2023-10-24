import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/auth');
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  if(isLoggedIn){
    window.location.href="/recipe"
  }
  return (
    <>
      <div className="bg-HomeBG bg-cover mx-auto flex flex-col justify-center h-screen">
        <h1 className="bg-opacity-50 text-5xl font-bold text-center text-white mb-8 relative hover:scale-110">
          Welcome to <span className="text-rose-600">Spices Storyline</span>
        </h1>
        <p className="text-2xl text-center text-white mb-12">
          Discover <span className="text-rose-600">amazing content</span> and more.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup" className="btn btn-primary hover:scale-105">
            Get Started
          </Link>
          <Link to="about" className="btn btn-secondary hover:scale-105">
            Learn More
          </Link>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
