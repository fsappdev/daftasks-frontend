import React, { useReducer } from "react";
// eslint-disable-next-line
//import { v4 as uuidv4 } from "uuid";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../Types/index";

/* const Proyectos = [
  { id: 1, nombre: "Tienda Virtual" },
  { id: 2, nombre: "Intranet" },
  { id: 3, nombre: "web design" },
  { id: 4, nombre: "GraphQL" },
  { id: 5, nombre: "Vue.js" }
]; */
//const id = uuidv4
const ProyectoState = props => {
  /* const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "electronjs" },
    { id: 3, nombre: "web design" },
    { id: 4, nombre: "GraphQL" },
    { id: 5, nombre: "Nodejs" }
  ]; */

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  };

  //dispatch para ejecutar las accioens
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //funciones
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  ///obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      console.log(resultado.data);
      dispatch({
        type: OBTENER_PROYECTO,
        /* payload: resultado.data.proyectos */
        payload: resultado.data.proyectos
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  //agregar un nuevo proyecto
  const agregarProyecto = async proyecto => {
    //proyecto.id = uuidv4;
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      //console.log(resultado);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  //VALIDAR FORM
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  };
  //
  //selecc. el proy al que el user le dio click
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    });
  };
  //
  const eliminarProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      });
    } catch (error) {
      //console.log(error);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  //
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        //proyectos: state.Proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
