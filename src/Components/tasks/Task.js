import React, { useContext } from "react";
import tareaContext from "../../Context/tareas/tareaContext";
import proyectoContext from "../../Context/proyectos/proyectoContext";

const Task = ({ tarea }) => {
  //
  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaACtual
  } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const [proyectoActual] = proyecto;

  //funcion/ se ejecuta cuando el user hace click en eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  //cambia el estado de la tarea de completo a incom. y viceversa
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  //agregar una tarea actual al estado para editarla
  const seleccionarTarea = tarea => {
    guardarTareaACtual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            onClick={() => {
              cambiarEstado(tarea);
            }}
            type="button"
            className="completo"
          >
            completo
          </button>
        ) : (
          <button
            onClick={() => {
              cambiarEstado(tarea);
            }}
            type="button"
            className="incompleto"
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          onClick={() => {
            seleccionarTarea(tarea);
          }}
          type="button"
          className="btn btn-primario"
        >
          editar
        </button>
        <button
          onClick={() => {
            tareaEliminar(tarea._id);
          }}
          type="button"
          className="btn btn-secundario"
        >
          eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
