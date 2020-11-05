import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import React, { useState } from "react";
export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const res = await clienteAxios.get(`/api/enlaces/${enlace}`);
  console.log(res);

  return {
    props: {
      enlace: res.data,
    },
  };
}

export async function getServerSidePath() {
  const enlaces = await clienteAxios.get("/api/enlaces");

  return {
    paths: enlaces.data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {
  const [tienePass, setTienePass] = useState(enlace.password);

  console.log(enlace);

  const verificarPassword = (e) => {
    console.log(e);
  };

  return (
    <Layout>
      {tienePass ? (
        <>
          <p className="text-center">Enlace protegido por password</p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Password"
                />

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar Password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
