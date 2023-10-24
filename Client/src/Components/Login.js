import React, {useState,useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
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
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  axios.defaults.withCredentials=true;

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      if (response && response.data) {
        console.log(response.data);
        setErrorMessage(response.data.message);
        window.location.href="/recipe"
      } else {
        console.error('Login response does not contain data:', response);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className="bg-LoginBg bg-cover h-screen flex justify-center items-center bg-center">
        <div className="opacity-95 bg-white p-10  rounded-lg shadow-lg text-center hover:opacity-100">
          <h1 className="text-5xl font-serif pb-8">Login</h1>
          <p className="text-2xl text-left font-bold mb-0">Email:</p>
          <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
          <p className="text-2xl text-left font-bold mb-0">Password:</p>
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="w-full px-10 py-2 mb-5 rounded-lg text-lg border border-gray-600" />
          {errorMessage && <div id="Error" className='text-red-500 font-bold pb-5'>{errorMessage}</div>}
          <button className='w-full py-3 bg-blue-500 text-white font-bold rounded-full cursor-pointer text-lg hover:bg-sky-700' onClick={handleLogin}>Login</button>
          <p className="mt-3"><Link to="/signup" className="text-blue-500 font-bold hover:text-sky-700">New user ? Register here</Link></p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Login;
