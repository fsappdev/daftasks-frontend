import React from "react";
import NuevoProyecto from "../proyects/NuevoProyecto";
import ListadoProyectos from "../proyects/ListadoProyectos";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        DAF<span>Tasks</span>
      </h1>

      <NuevoProyecto />

      <div className="proyectos">
        <h2>tus proyectos</h2>

        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default Sidebar;
