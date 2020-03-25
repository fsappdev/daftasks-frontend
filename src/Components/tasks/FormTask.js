import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";

const FormTask = () => {
  //
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;
  //

  //effect que detecta si se selecciono una tarea
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada]);

  //state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ""
  });
  //
  //extraer el nombre del proyecto
  const { nombre } = tarea;
  //si no hay proyecto seleccioando
  if (!proyecto) {
    return null;
  }
  //array destructuring para extrer el proy actual
  const [proyectoActual] = proyecto;

  //leer los valores del form
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };
  //
  const onSubmit = e => {
    e.preventDefault();

    //validar tarea
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //si es edicion o si es nueva tarea
    if (tareaseleccionada === null) {
      //tarea nueva
      //agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      //console.log(tarea);
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea); //actualizar tarea
      limpiarTarea(); //elimina tarea seleccioanda del state.
    }

    //pasar la validacion
    //obtener tareas y filtrar del proyecto actual
    obtenerTareas(proyectoActual.id);

    //reinicar el form
    guardarTarea({
      nombre: ""
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTask;
