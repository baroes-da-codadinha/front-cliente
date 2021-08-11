import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}

function Rotas() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/"/>
          <Route path="/cadastro"/>
          <RotasProtegidas>
            <Route path="/produtos"/>
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default Rotas;
