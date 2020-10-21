import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_OK,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  //State inicial
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  //reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Registrar usuario
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      // console.log(respuesta.data.msg);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      // console.log(error.response.data.msg);
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  //Autenticar usuario
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      // console.log(respuesta);
      dispatch({
        type: LOGIN_OK,
        payload: respuesta.data.token,
      });
    } catch (error) {
      // console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  //Usuario auth
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const res = await clienteAxios.get("/api/auth");
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: res.data.usuario,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
