import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../Types";

export default (state, action) => {
  switch (action.type) {
    case OCULTAR_ALERTA:
      return {
        alerta: null
      };
    case MOSTRAR_ALERTA:
      return {
        alerta: action.payload
      };
    default:
      return state;
  }
};
