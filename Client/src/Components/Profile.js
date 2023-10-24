import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({});
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/auth');
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
          setUser(res.data);
        } else {
          setIsLoggedIn(false);
          setMessage(res.data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePassword({ ...updatePassword, [name]: value });
  };

  const handleUpdatePassword = async () => {
    try {
      const res = await axios.post('http://localhost:8080/update-password', updatePassword);
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.error)
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-200">
      <Header />
      <div className="flex bg-ProfileBg bg-no-repeat bg-cover items-center justify-center h-screen">
        <div className="bg-white rounded-lg p-6 shadow-lg w-96">
          {isLoggedIn ? (
            <div className="profile-container">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">User Profile</h2>
              <div className="profile-details">
                <div className="mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="mb-2">
                  <strong>Username:</strong> {user.username}
                </div>
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 cursor-pointer"
              >
                Edit Profile
              </button>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Update Password</h3>
                <input
                  type="password"
                  name="oldPassword"
                  value={updatePassword.oldPassword}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Old Password"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={updatePassword.newPassword}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={updatePassword.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Confirm Password"
                />
                {errorMessage && <div id="Error" className='text-red-500 font-bold pb-5'>{errorMessage}</div>}
                <button
                  onClick={handleUpdatePassword}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600 cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-red-500 text-lg font-semibold mb-2">{message}</h3>
              <div
                className="text-blue-600 cursor-pointer underline"
                onClick={() => navigate('/login')}
              >
                Please Login to see your profile.
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
