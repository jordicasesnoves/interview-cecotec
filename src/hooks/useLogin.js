import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const useLogin = (credentials) => {
  const { state, setState } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  // Declaramos el temporizador para mas adelante poder limpiarlo
  var timer;

  const login = () => {
    setLoading(true);
    // Simulamos que las credenciales estan siendo comprobadas en un servidor de autenticacion
    timer = setTimeout(() => {
      if (
        credentials.emailValue == "test@cecotec.com" &&
        credentials.passwordValue == "c3c0t3c"
      ) {
        localStorage.setItem("user", credentials);

        setState({
          loggedIn: true,
        });
        setLoading(false);
        history.push("/");
      } else {
        alert("Credenciales incorrectas!");
        setError(error);
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    // Limpiamos el temporizador para evitar problemas de memoria o 'memory-leaks'
    // Esto es lo mismo que usar un componentWillUnmount con 'class-based-components'
    return () => clearTimeout(timer);
  }, []);

  return [login, loading, error];
};
