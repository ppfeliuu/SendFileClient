import React, { useReducer } from 'react'
import authContext from './authContext'
import authReducer from './authReducer';
import { USUARIO_AUTENTICADO } from '../../types';

import clienteAxios from '../../config/axios'

const AuthState = ({ children }) => {

    //State inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    //Usuario auth
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }

    return (
        <authContext.Provider value={
            {
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado
            }
        }>{children}

        </authContext.Provider>
    )
}

export default AuthState

