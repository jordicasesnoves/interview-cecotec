import React from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      <span className="text-4xl">Caso Práctico 1 - Cecotec</span>
      <p>Nombre: Jordi Casesnoves Martin</p>
      <Link className="text-blue-500 font-bold" to={"/clients"}>
        Pagina Clientes
      </Link>
      <br></br>
      <Link className="text-blue-500 font-bold" to={"/products"}>
        Pagina Productos
      </Link>
    </div>
  );
};
