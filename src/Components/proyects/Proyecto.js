import React, { useContext } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  //
  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //funcion para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); //fijar un proyecto actual
    obtenerTareas(id); //filrar las tareas cuando se hace click.
  };
  //
  return (
    <li>
      <button
        onClick={() => {
          /* proyectoActual(proyecto.id);
          obtenerTareas(proyecto.id); */
          seleccionarProyecto(proyecto._id);
        }}
        type="button"
        className="btn btn-blank"
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
