import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import appContext from "../context/app/appContext";
import Alerta from "../components/Alerta";

const Index = () => {
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl">
              <span className="font-bold text-red-700 text-3xl uppercase mt-10">
                Tu url es:
              </span>{" "}
              {`${process.env.frontendURL}/enlaces/${url}`}
            </p>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.frontendURL}/enlaces/${url}`
                )
              }
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
            >
              Copiar enlace
            </button>
          </>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">NodeSend</span> para
                  compartir archivos de manera pública ó privada
                </p>
                <Link href="/register">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Registrar cuenta
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
