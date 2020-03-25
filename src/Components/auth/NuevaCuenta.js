import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/alertas/alertaContext";
import AuthContext from "../../Context/autenticacion/authContext";

const NuevaCuenta = props => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { registrarUsuario, mensaje, autenticado } = authContext;

  //En caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
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
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  //extraer de usuario
  const { email, password, nombre, confirmar } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    //validacion
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios!!", "alerta-error");
      return;
    }
    //pass no menor a 6 carachteres
    if (password.length < 6) {
      mostrarAlerta("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    //ambos pass iguales
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas NO COINCIDEN :-(");
    }

    //pasar al action
    registrarUsuario({
      nombre,
      email,
      password
    });
  };

  //
  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Crear Una cuenta nueva</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

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
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repetir Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            {/* <input
              type="submit"
              className="btn btn-primario btn-block"
              value={`_registrarme` || alerta.msg}
  /> */}
            {/* {alerta ? (
              <div className={`${alerta.categoria}`}>{alerta.msg}</div>
            ) : null} */}
            {alerta ? (
              <input
                type="submit"
                className="error btn btn-primario btn-block"
                value={alerta.msg}
              />
            ) : (
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="_registrarme"
              />
            )}
          </div>

          <Link to={"/"} className="enlace-cuenta">
            _volver a Iniciar Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NuevaCuenta;
