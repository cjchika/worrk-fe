import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";

    if (loggedInStatus && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className=" bg-blue-500 shadow-md p-4 text-white">
      <div className="container max-w-[1000px] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Worrk</Link>
        </h1>
        <ul className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/add-job" className="hover:text-gray-200">
                  Add Job
                </Link>
              </li>
              <li className="hover:text-gray-200">
                Welcome, {user?.firstName} {user?.lastName}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-200 focus:outline-none bg-white text-blue-600 p-2 rounded-xl px-4"
                >
                  Logout
                </button>
              </li>
            </>
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
