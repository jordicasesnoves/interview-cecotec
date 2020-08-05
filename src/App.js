import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Usamos la Context API de React para gestionar la sesion del usuario
import { ContextProvider, Context } from "./context/UserContext";

import { Home, Login, Products, Users } from "./pages";
import { Navbar } from "./components/Navbar";

// La diferencia entre la ruta privada y la ruta 'Auth' es la redireccion
const PrivatedRoute = ({ ...props }) => {
  const { state } = useContext(Context);
  return state.loggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

const AuthRoute = ({ ...props }) => {
  const { state } = useContext(Context);
  return state.loggedIn ? <Redirect to="/" /> : <Route {...props} />;
};

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100">
          {/* Content Container */}
          <div className="">
            <Switch>
              <PrivatedRoute exact path="/">
                <Navbar />
                <Home />
              </PrivatedRoute>

              <PrivatedRoute path="/users">
                <Navbar />
                <Users />
              </PrivatedRoute>

              <PrivatedRoute path="/products">
                <Navbar />
                <Products />
              </PrivatedRoute>

              <AuthRoute exact path="/login" component={Login} />
              <Route path="*">Error 404. Pagina no encontrada.</Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
