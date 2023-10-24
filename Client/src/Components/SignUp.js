import React, { useState ,useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
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
    // Variables Making
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [errorMessage, setErrorMessage] = useState('');

    // SignUp Function
    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signup', formData);
            console.log(response.data);
            window.location.href = '/login';
        } catch (error) {
            console.error('SignUp error:', error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div className='bg-SignUpBg bg-cover min-h-screen flex justify-center items-center bg-center'>
                <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg text-center hover:bg-opacity-100">
                    <h1 className="text-5xl font-serif pb-8">Sign Up</h1>
                    <p className="text-left font-bold mb-0">Username:</p>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
                    <p className="text-left font-bold mb-0">Email:</p>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
                    <p className="text-left font-bold mb-0">Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
                    <p className="text-left font-bold mb-0">Confirm Password</p>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
                    {errorMessage && (<div id="Error" className='text-red-500 font-bold pb-5'>{errorMessage}</div>)}
                    <button
                        className='w-full py-3 bg-blue-500 text-white font-bold rounded-full cursor-pointer text-lg hover:bg-sky-700'
                        onClick={handleSignUp}>Continue</button>
                    <p className="mt-3">
                        Already a user? <Link to="/login" className="text-blue-500 font-bold hover:text-sky-700">Login to your account</Link>
                    </p>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default SignUp;