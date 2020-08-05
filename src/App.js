import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Usamos la Context API de React para gestionar la sesion del usuario
import { UserContextProvider, UserContext } from "./context/UserContext";

import { Home, Login, Products, Users } from "./pages";
import { Navbar } from "./components/Navbar";

// La diferencia entre la ruta privada y la ruta 'Auth' es la redireccion
const PrivatedRoute = ({ ...props }) => {
  const { state } = useContext(UserContext);
  return state.loggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

const AuthRoute = ({ ...props }) => {
  const { state } = useContext(UserContext);
  return state.loggedIn ? <Redirect to="/" /> : <Route {...props} />;
};

const ContentContainer = (props) => {
  return <div className="max-w-6xl mx-auto py-12">{props.children}</div>;
};

// Si el usuario no esta logeado, solo puede acceder a /login
export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="">
          {/* Content Container */}
          <div className="">
            <Switch>
              <PrivatedRoute exact path="/">
                <Navbar />
                <ContentContainer>
                  <Home />
                </ContentContainer>
              </PrivatedRoute>

              <PrivatedRoute path="/users">
                <Navbar />
                <ContentContainer>
                  <Users />
                </ContentContainer>
              </PrivatedRoute>

              <PrivatedRoute path="/products">
                <Navbar />
                <ContentContainer>
                  <Products />
                </ContentContainer>
              </PrivatedRoute>

              <AuthRoute exact path="/login" component={Login} />
              <Route path="*">Error 404. Pagina no encontrada.</Route>
            </Switch>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}
