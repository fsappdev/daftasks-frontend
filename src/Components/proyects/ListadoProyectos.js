import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import AlertaContext from "../../Context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  //extraer proyectos del state incial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;
  //
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //OBTENER PROY CUANDO CARGA EL COMP
  //NOTA IMPORTANTE: ANTES DE UN USEEFFECT NUNCA DEBE HABER UN RETURN

  useEffect(() => {
    //si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  //revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    // eslint-disable-next-line
    return <h3> &#x23EB; Cree un proyecto para comenzar a trabajar</h3>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto._id} timeout={400} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
