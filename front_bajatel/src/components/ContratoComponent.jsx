import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getContratoUsuario,
  cancelarContratoUsuario,
} from "../api/contratosApi";
import { Link, useNavigate } from "react-router-dom";
import { Wifi, Smartphone, Tv, Pencil, X } from "lucide-react";

function ContratoComponent() {
  const { token } = useContext(AuthContext);
  const [contratoData, setContratoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nuevo: mensaje de éxito
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  // FUNCION PARA OBTENER EL CONTRATO
  const fetchContrato = async () => {
    setLoading(true);
    try {
      const data = await getContratoUsuario(token);
      setContratoData(data || null);
    } catch (err) {
      setError("Error al obtener el contrato");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContrato();
  }, [token]);

  // CANCELAR CONTRATO
  const handleCancelarContrato = async () => {
    try {
      const response = await cancelarContratoUsuario(token);

      // Guardamos el mensaje que devuelve la API
      setSuccessMessage(
        response.message || "Contrato cancelado correctamente."
      );

      // Recargamos los datos del contrato
      await fetchContrato();
    } catch (error) {
      console.error("Error al cancelar el contrato:", error);
      setError("Error al cancelar el contrato.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando contrato...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const noContrato = !contratoData;

  return (
    <div className="flex flex-col items-center w-full">
      {/* MENSAJE DE ÉXITO */}
      {successMessage && (
        <div className="w-full max-w-7xl bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-md mb-4 shadow text-center font-semibold">
          {successMessage}
        </div>
      )}

      {/* SI NO HAY CONTRATO */}
      {noContrato ? (
        <div className="text-center mt-10">
          <p className="mb-4 text-gray-700 text-lg">
            No tienes ningún contrato activo.
          </p>
          <button
            onClick={() => navigate("/contratar")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 shadow-md transition"
          >
            Contratar servicio
          </button>
        </div>
      ) : (
        <>
          {/* CONTRATO EXISTENTE */}
          <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
            {/* CABECERA AZUL */}
            <div className="bg-blue-600 text-white font-semibold px-6 py-4 flex items-center gap-2 text-lg">
              Tu Contrato
            </div>

            {(() => {
              const { contrato, servicios } = contratoData;

              return (
                <>
                  {/* DIRECCIÓN */}
                  <div className="px-6 py-6 grid md:grid-cols-3 gap-6 border-b border-gray-100 bg-white">
                    <div>
                      <p className="text-xs text-gray-500">Calle</p>
                      <p className="font-semibold text-gray-800">
                        {contrato.calle_y_n}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Ciudad</p>
                      <p className="font-semibold text-gray-800">
                        {contrato.ciudad}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Código Postal</p>
                      <p className="font-semibold text-gray-800">
                        {contrato.codigo_postal}
                      </p>
                    </div>
                  </div>

                  {/* TARJETAS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 bg-white">
                    {/* FIBRA */}
                    {servicios?.fibra && (
                      <div className="rounded-xl border border-blue-600 shadow-sm hover:shadow-lg transition bg-white">
                        <div className="bg-blue-600 text-white py-4 flex flex-col items-center rounded-t-xl">
                          <Wifi size={28} />
                          <span className="font-semibold mt-1">
                            Fibra Óptica
                          </span>
                        </div>
                        <div className="p-5 text-center">
                          <p className="text-3xl font-extrabold text-blue-700"> {servicios.fibra.velocidad} </p>
                          <p className="text-gray-700 mt-1">
                            <span className="text-green-700 font-bold text-2xl">
                              {servicios.fibra.precio}€
                            </span>
                            <span className="text-gray-500 text-xl"> /mes</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* LÍNEAS MÓVILES */}
                    {servicios.lineas && servicios.lineas.length > 0 && (
                      <div className="rounded-xl border border-green-600 shadow-sm hover:shadow-lg transition bg-white">
                        <div className="bg-green-600 text-white py-4 flex flex-col items-center rounded-t-xl">
                          <Smartphone size={28} />
                          <span className="font-semibold text-xl">
                            Líneas Móviles
                          </span>
                        </div>

                        <div className="px-6 py-4 text-sm">
                          <div className="grid grid-cols-4 font-semibold text-gray-700 mb-3 text-base border-b pb-2">
                            <span className="text-center">Teléfono</span>
                            <span className="text-center">Datos</span>
                            <span className="text-center">Llamadas</span>
                            <span className="text-center">Precio</span>
                          </div>

                          {servicios.lineas.map((linea) => (
                            <div
                              key={linea.id_linea}
                              className="grid grid-cols-4 items-center py-2 border-b last:border-b-0"
                            >
                              <span className="flex justify-center items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
                                <Smartphone
                                  size={16}
                                  className="text-blue-600"
                                />
                                {linea.numero}
                              </span>

                              <span className="flex justify-center">
                                <span className="bg-cyan-500 text-white px-2 py-1.5 rounded-full text-xs font-bold text-center whitespace-nowrap">
                                  {linea.movil_opcion.gb_datos < 0
                                    ? "∞"
                                    : linea.movil_opcion.gb_datos}{" "}
                                  GB
                                </span>
                              </span>

                              <span className="flex justify-center">
                                <span className="bg-gray-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold text-center whitespace-nowrap">
                                  {linea.movil_opcion.min_llamadas < 0
                                    ? "∞"
                                    : linea.movil_opcion.min_llamadas}{" "}
                                  min
                                </span>
                              </span>

                              <span className="text-green-700 font-semibold text-center whitespace-nowrap">
                                {linea.movil_opcion.precio}€
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TV */}
                    {servicios?.tv && (
                      <div className="rounded-xl border border-yellow-400 shadow-sm hover:shadow-lg transition bg-white">
                        <div className="bg-yellow-400 text-black py-4 flex flex-col items-center rounded-t-xl">
                          <Tv size={28} />
                          <span className="font-semibold mt-1">Televisión</span>
                        </div>

                        <div className="p-5 text-center">
                          <p className="text-3xl font-extrabold text-yellow-400 ">
                            {servicios.tv.nombre_paquete}
                          </p>
                          <p className="mt-1">
                            <span className="text-green-700 font-bold text-2xl">
                              {servicios.tv.precio}€
                            </span>
                            <span className="text-gray-500 text-xl"> /mes</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PRECIO TOTAL */}
                  <div className="px-6 py-5 bg-green-50 text-center border-t border-green-100">
                    <p className="text-lg font-bold text-green-700">
                      Precio Total: {contrato.precio_total} €/mes
                    </p>
                  </div>

                  {/* FECHA */}
                  <div className="px-6 py-4 bg-blue-50 border-t text-blue-700 font-semibold text-sm">
                    Fecha de contratación: {contrato.fecha_alta}
                  </div>

                  {/* BOTONES */}
                  <div className="px-6 py-4 bg-white flex justify-end">
                    <Link
                      to="/editar-contrato"
                      className="mr-3 px-4 py-2 bg-blue-600 text-white font-semibold border border-blue-600 rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-2 shadow-md"
                    >
                      <Pencil size={16} />
                      Modificar
                    </Link>

                    <button
                      onClick={handleCancelarContrato}
                      className="px-4 py-2 bg-red-100 text-red-600 font-semibold border border-red-300 rounded-md hover:bg-red-200 transition text-sm flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}

export default ContratoComponent;
