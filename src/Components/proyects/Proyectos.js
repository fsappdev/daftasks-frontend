import React, { useContext, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Barra from "../Layouts/Barra";
import FormTask from "../tasks/FormTask";
import ListTasks from "../tasks/ListTasks";
import AuthContext from "../../Context/autenticacion/authContext";

const Proyectos = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado(); //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      {/*aca va ir el sidebar*/}
      <Sidebar />
      {/*te dije que iba el sidebar*/}

      <div className="seccion-principal">
        <Barra />

        <main>
          <FormTask />

          <div className="contendor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
