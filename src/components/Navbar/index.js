import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const { state, setState } = useContext(UserContext);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    setState({
      loggedIn: false,
    });
  }

  function redirectToHomePage() {
    if (location.pathname !== "/") {
      history.push("/");
    }
  }

  return (
    <div className="bg-blue-500">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between flex-wrap p-6 lg:p-0 py-3 lg:py-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <span className="font-semibold text-xl tracking-tight">Cecotec</span>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to={"/"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to={"/users"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Users
            </Link>
            <Link
              to={"/products"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Products
            </Link>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
