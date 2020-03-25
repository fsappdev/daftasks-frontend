import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../Types";
import clienteAxios from "../../config/axios";
//import { v4 as uuidv4 } from "uuid";

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  //CREAR DISPATCH Y STATE
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //CREAR LAS FUNCIONES

  //OBTENER TAREAS DE UN PROY
  const obtenerTareas = async proyecto => {
    console.log(proyecto);
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto }
      });
      //console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.log(error);
    }
  };

  //
  const agregarTarea = async tarea => {
    //tarea.id = uuidv4();
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  //VALIDA Y MUESTRA UN ERROR
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  //eliminar tarea por su id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  //EDITA O MODIFICA UNA TAREA
  const actualizarTarea = async tarea => {
    console.log(tarea);
    try {
      const resultado = await clienteAxios.put(
        `api/tareas/${tarea._id}`,
        tarea
      );
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  //extrae unatarea para edicion
  const guardarTareaACtual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  //elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaACtual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
