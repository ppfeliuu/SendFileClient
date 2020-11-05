import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_OK,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_OK,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatchEvent({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  const subirArchivos = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const res = await clienteAxios.post("/api/archivos", formData);
      console.log(res.data);

      dispatch({
        type: SUBIR_ARCHIVO_OK,
        payload: {
          nombre: res.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const crearEnlace = async () => {
    console.log("Creando enlace");
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
      const res = await clienteAxios.post("/api/enlaces", data);
      // console.log(res.data);
      dispatch({
        type: CREAR_ENLACE_OK,
        payload: res.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  const agregarpass = (pass) => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: pass,
    });
  };

  const agregarDescargas = (descargas) => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas,
    });
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        url: state.url,
        autor: state.autor,
        mostrarAlerta,
        subirArchivos,
        crearEnlace,
        limpiarState,
        agregarpass,
        agregarDescargas,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
