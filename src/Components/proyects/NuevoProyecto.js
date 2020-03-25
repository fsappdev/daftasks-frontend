import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    errorformulario,
    formulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext;
  //
  const [proyecto, guardarProyecto] = useState({
    nombre: ""
  });
  //extremos el nombre de proyecto
  const { nombre } = proyecto;

  //cambiar el estado con el input
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  //enviar el proyecto
  const onSubmitProyecto = e => {
    e.preventDefault();
    //validar el proyecto
    if (!nombre) {
      mostrarError();
      return;
    }
    //agregar al state
    agregarProyecto(proyecto);
    //reinicar el form
    guardarProyecto({
      nombre: ""
    });
  };

  //
  //mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };
  //
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre de proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
