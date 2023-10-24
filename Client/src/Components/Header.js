import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Header = () => {
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

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:8080/logout');
      if (res.status === 200) {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between logo-container">
        <div className="flex items-center">
          <img src="https://cdn.pixabay.com/photo/2017/02/21/08/49/food-2085075_1280.png" alt="Logo" className="max-w-100 h-10 mr-2" />
          <p className="text-red-600 text-3xl font-bold">Spices Storyline</p>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-red-600 text-bold px-4 py-2 hover:bg-red-600 hover:text-white rounded-md">Profile</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-4 py-2 rounded-md"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-white bg-red-600 px-4 py-2 rounded-md">Get Started</Link>
            </div>
          )}
        </div>
      </div>
      <nav>
        <ul className="text-center list-none p-0 mb-2">
          <li className="inline">
            <Link to="/recipe" className="text-red-600 text-bold text-3vh px-4 py-2 hover:bg-red-600 hover:text-white">Recipe</Link>
          </li>
          <li className="inline">
            <Link to="/about" className="text-red-600 text-bold text-3vh px-4 py-2 hover:bg-red-600 hover:text-white">About Us</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
