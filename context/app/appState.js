import React, { useReducer } from "react";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO_OK,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_OK,
  CREAR_ENLACE_ERROR,
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";

const AppState = ({ children }) => {
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};

export default AppState;
