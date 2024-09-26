import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <nav className="bg-blue-500 shadow-md p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Worrk</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/add-job" className="hover:text-gray-200">
              Add Job
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <Link to="/profile" className="hover:text-gray-200">
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
