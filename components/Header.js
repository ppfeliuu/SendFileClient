import React, { useEffect, useContext } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const AuthContext = useContext(authContext);
  const { usuario, cerrarSesion } = AuthContext;

  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  const redirect = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img
          onClick={() => redirect()}
          className="w-64 mb-8 md:mb-0 cursor-pointer"
          src="/logo.svg"
        />
      </Link>
      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              type="button"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Iniciar Sesión
              </a>
            </Link>

            <Link href="/register">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Registrar
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
