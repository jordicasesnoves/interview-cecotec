// Para la gestion de la sesion del usuario vamos a usar la API de Context de React
import React, { useState } from "react";

let user = localStorage.getItem("user") || null;

const initialState = {
  loggedIn: !!user,
};

const Context = React.createContext(initialState);

// Creamos el componente ContextProvider, siguiendo asi uno de los patrones de la API
const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);
  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
