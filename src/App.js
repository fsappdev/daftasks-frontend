import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import NuevaCuenta from "./Components/auth/NuevaCuenta";
import Proyectos from "./Components/proyects/Proyectos";

import ProyectoState from "./Context/proyectos/proyectoState.js";
import TareaState from "./Context/tareas/tareaState.js";
import AlertaState from "./Context/alertas/alertaState";
import AuthState from "./Context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./Components/rutas/RutaPrivada";

//revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
