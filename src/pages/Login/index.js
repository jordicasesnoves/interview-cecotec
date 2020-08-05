import React, { useContext, useState, useEffect } from "react";
import { Button } from "../../components";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const [values, setValues] = useState({
    emailValue: "test@cecotec.com",
    passwordValue: "c3c0t3c",
  });

  // Usamos nuestro custom Hook 'useLogin' para organizar mejor el codigo
  const [login, loading, error] = useLogin(values);

  const submitForm = (e) => {
    e.preventDefault();
    // Prevenir que se haga un intento de login mientras se esta haciendo otro
    if (loading) return;
    login();
  };

  if (error) alert(error.message);
  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold my-4 text-center text-gray-900">
          Cecotec
        </h1>
        <form
          onSubmit={(e) => {
            submitForm(e, values);
          }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
              Email
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={values.emailValue}
              onChange={(e) =>
                setValues({ ...values, emailValue: e.target.value })
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
              value={values.passwordValue}
              onChange={(e) =>
                setValues({ ...values, passwordValue: e.target.value })
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
