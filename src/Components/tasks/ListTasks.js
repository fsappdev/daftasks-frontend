import React, { Fragment, useContext } from "react";
import Task from "./Task";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListTasks = () => {
  //
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //obtener el proyecto actual
  //const [proyectoActual] = proyecto;

  //obtener las tareas del proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;
  //

  //si no hay proyecto seleccioando
  if (!proyecto) {
    return (
      /* <button className="btn btn-secundario">
        &#x25C0; Seleccione un proyecto, para comenzar a trabajar
      </button> */
      <h3> &#x25C0; Seleccione un proyecto para comenzar a trabajar</h3>
    );
  }
  //array destructuring para extrer el proy actual
  const [proyectoActual] = proyecto;
  //

  //eliminamos el proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  /* <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition key={tarea.id} timeout={200}>
                <Task tarea={tarea}  />
              </CSSTransition>
            ))}
          </TransitionGroup> */

  //
  return (
    <Fragment>
      <br />
      <h2>Proyecto: {proyectoActual.nombre} </h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition key={tarea.id} timeout={400} classNames="tarea">
                <Task tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        onClick={onClickEliminar}
        type="button"
        className="btn btn-eliminar"
      >
        <p>&#x1F4AF; &#x1F61F; Eliminar proyecto &times;</p>
      </button>
    </Fragment>
  );
};

export default ListTasks;
