import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/alertas/alertaContext";
import AuthContext from "../../Context/autenticacion/authContext";

const Login = props => {
  //
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { autenticado, mensaje, iniciarSesion } = authContext;

  //en caso de que el usuario o password no existan
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    } //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //state para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: ""
  });

  //extraer de usuario
  const { email, password } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    //validacion que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios!!", "alerta-error");
    }
    //pasar al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            {/* <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Inicio"
            /> */}
            {alerta ? (
              <input
                type="text"
                className="error btn btn-primario btn-block"
                value={alerta.msg}
              />
            ) : (
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Inicio"
              />
            )}
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Crear Una cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
