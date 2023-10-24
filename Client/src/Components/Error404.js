import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

const Error404 = () => {
  return (
    <>
      <Header />
      <div className='body'>
        <h1 style={{ color: '#ff5733', fontSize: '3rem', marginBottom: '10px'}}>404 - Page Not Found</h1><br />
        <p>Oops! The page you are looking for does not exist.</p>
        <p><Link to="/" className="link" style={{ fontSize: '1.2rem' }}>Go back to the homepage</Link></p>
      </div >
      <Outlet />
    </>
  );

};

export default Error404;