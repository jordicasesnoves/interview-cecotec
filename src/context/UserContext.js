// Para la gestion de la sesion del usuario vamos a usar la API de Context de React
import React, { useState } from "react";

let user = localStorage.getItem("user") || null;

const initialState = {
  loggedIn: !!user,
};

const UserContext = React.createContext(initialState);

// Creamos el componente ContextProvider, siguiendo asi uno de los patrones de la API
const UserContextProvider = (props) => {
  const [state, setState] = useState(initialState);
  return (
    <UserContext.Provider value={{ state, setState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
