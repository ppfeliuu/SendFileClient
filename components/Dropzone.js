import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";

const Dropzone = () => {
  const onDropRejected = () => {
    console.log("No");
  };
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);
    const res = await clienteAxios.post("/api/archivos", formData);
    console.log(res.data);
  });
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1004, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  const crearEnlace = () => {
    console.log("Creando enlace");
  };

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>
          <button
            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
            type="button"
            onClick={() => crearEnlace()}
          >
            Crear enlace
          </button>
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Suéltalo</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo ó arrastralo
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Subir archivos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
