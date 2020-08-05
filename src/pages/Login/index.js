import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { Button } from "../../components";

export const Login = () => {
  const { state, setState } = useContext(UserContext);
  const history = useHistory();

  const [value, setValue] = useState({
    emailValue: "",
    passwordValue: "",
  });

  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prevent for submitting more than once
    if (loading) return;
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold my-4 text-center">Cecotec</h1>
        <form
          onSubmit={(e) => {
            //submitForm(e);
          }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
              htmlFor="username"
            >
              Email
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={value.emailValue}
              onChange={(e) =>
                setValue({ ...value, emailValue: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={value.passwordValue}
              onChange={(e) =>
                setValue({ ...value, passwordValue: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button loading={loading} type="submit" fullWidth color="primary">
              Log In
            </Button>
          </div>
          <div className="text-gray-600 text-center">
            Don't have an account?{" "}
            <a to={"/signup"} className="text-indigo-500 ">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
