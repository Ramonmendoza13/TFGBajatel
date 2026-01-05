import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getServiciosDisponibles } from "../api/serviciosApi";
import { contratarServicios } from "../api/contratosApi";
import { useContrato } from "../hooks/useContrato";
import * as UI from "../components/ContratoCommon";
import { Wifi, Smartphone, Tv, FileText, MapPin, CreditCard, ShoppingBag, CheckCircle } from "lucide-react";

export default function ContratarComponent() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [ofertas, setOfertas] = useState(null);
  const [cargando, setCargando] = useState(true);

  const {
    seleccion, cliente, alternarServicio, gestionarMovil,
    actualizarCliente, calcularTotal, esFormularioValido
  } = useContrato();

  useEffect(() => {
    getServiciosDisponibles()
      .then(data => setOfertas(data))
      .finally(() => setCargando(false));
  }, []);

  const contratar = async () => {
    setError(null); setEnviando(true);
    try {
      await contratarServicios({ cliente, seleccion, token });
      localStorage.setItem("adminMessage", `Contrato creado correctamente`);
      navigate("/zona-privada");
    } catch (error) {
      console.error("DETALLE DEL ERROR:", error);

      if (error.response) {
        // Errores HTTP conocidos
        if (error.response.status === 400) {
          setError("Ya tienes un contrato. Edítalo desde la zona privada.");
        }  else if (error.response.status === 401) {
          setError(error.response.data?.message || `Debes iniciar sesión para contratar servicios.`);
        } else {
          setError(error.response.data?.message || `Error ${error.response.status}: No se pudo crear el contrato`);
        }
      } else if (error.request) {
        // La petición se envió pero no hubo respuesta
        setError("El servidor no respondió correctamente. Inténtalo de nuevo más tarde.");
      } else {
        // Error local/inesperado
        setError(error.message || "Error inesperado");
      }
    } finally { setEnviando(false); }
  };

  if (cargando) return <UI.LoadingScreen />;

  return (
    <div className="flex-grow bg-slate-50 pt-32 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <UI.Header titulo="Configura tu tarifa" subtitulo="Personaliza los servicios a tu medida y completa tus datos." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <UI.Seccion icono={Wifi} titulo="Fibra Óptica" subtitulo="Velocidad simétrica garantizada">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ofertas.fibra.map(f => (
                  <UI.OpcionCard key={f.id_fibra} activo={seleccion.fibra?.id_fibra === f.id_fibra} onClick={() => alternarServicio('fibra', f, 'id_fibra')} titulo={`${f.velocidad < 1000 ? `${f.velocidad} Mbps` : `${Math.floor(f.velocidad / 1000)} Gbps`}`} subtitulo="Fibra Simétrica" precio={f.precio} />
                ))}
              </div>
            </UI.Seccion>

            <UI.Seccion icono={Smartphone} titulo="Líneas Móviles" subtitulo="Datos y llamadas para todos">
              <div className="space-y-6">
                {seleccion.movil.map((linea, idx) => (
                  <UI.LineaMovilCard key={linea.uid} linea={linea} index={idx} ofertas={ofertas.movil} actions={gestionarMovil} />
                ))}
                <UI.BotonAdd onClick={gestionarMovil.add} label="Añadir nueva línea móvil" />
              </div>
            </UI.Seccion>

            <UI.Seccion icono={Tv} titulo="Televisión" subtitulo="El mejor entretenimiento">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ofertas.tv.map(t => (
                  <UI.OpcionCard key={t.id_tv} activo={seleccion.tv?.id_tv === t.id_tv} onClick={() => alternarServicio('tv', t, 'id_tv')} titulo={t.nombre_paquete} subtitulo="Pack de canales" precio={t.precio} />
                ))}
              </div>
            </UI.Seccion>

            <UI.Seccion icono={FileText} titulo="Datos de Contratación" subtitulo="Dirección de instalación y facturación">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <UI.InputGroup className="sm:col-span-12" label="Dirección Completa" icon={MapPin} name="calle" val={cliente.calle} onChange={actualizarCliente} placeholder="Ej: Av. de la Constitución 45, 3º Izquierda" />
                <UI.InputGroup className="sm:col-span-3" label="C. Postal" name="cp" val={cliente.cp} onChange={actualizarCliente} maxLength={5} placeholder="28001" />
                <UI.InputGroup className="sm:col-span-5" label="Ciudad" name="ciudad" val={cliente.ciudad} onChange={actualizarCliente} placeholder="Madrid" />
                <UI.InputGroup className="sm:col-span-4" label="Provincia" name="provincia" val={cliente.provincia} onChange={actualizarCliente} placeholder="Madrid" />
                <div className="sm:col-span-12 mt-2 mb-1 border-t border-slate-100"></div>
                <div className="sm:col-span-12">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                    <UI.InputGroup className="w-full" label="Cuenta IBAN (Domiciliación)" icon={CreditCard} name="iban" val={cliente.iban} onChange={actualizarCliente} placeholder="ES00 0000 0000 0000 0000 0000" mono cleaveOptions={{
                      blocks: [4, 4, 4, 4, 4, 4], // Bloques de 4 caracteres
                      uppercase: true, // Forzar mayúsculas
                    }} />
                    <p className="text-xs text-blue-600/70 mt-2 ml-1 flex items-center gap-1"><CheckCircle size={12} /> Se usará para domiciliar tus facturas mensuales.</p>
                  </div>
                </div>
              </div>
            </UI.Seccion>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-28 transition-all">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 p-4 text-white flex items-center gap-3">
                <ShoppingBag size={20} className="text-blue-400" /><h3 className="font-bold text-lg">Resumen del pedido</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <UI.ItemResumen icono={Wifi} label="Fibra" val={seleccion.fibra ? `${seleccion.fibra.velocidad < 1000
                                                        ? `${seleccion.fibra.velocidad} Mbps`
                                                        : `${Math.floor(seleccion.fibra.velocidad / 1000)} Gbps`}` : null} precio={seleccion.fibra?.precio} />
                  <UI.ItemResumen icono={Tv} label="TV" val={seleccion.tv ? seleccion.tv.nombre_paquete : null} precio={seleccion.tv?.precio} />
                </div>
                {seleccion.movil.length > 0 && (
                  <div className="pt-3 border-t border-dashed border-slate-200">
                    <div className="flex items-center gap-2 text-slate-500 mb-2"><Smartphone size={14} /><span className="text-xs font-bold uppercase">Móvil</span></div>
                    {seleccion.movil.map((l, i) => (
                      <div key={l.uid} className="flex flex-col text-sm border-b border-slate-50 pb-2 mb-2 last:border-0">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-600">Línea {i + 1}</span><span className="text-slate-900">{l.tarifa ? `${l.tarifa.precio} €` : "—"}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 flex justify-between">
                          <span>{l.tarifa ? `${l.tarifa.gb_datos}GB` : 'Sin tarifa'}</span>
                          <span className={l.tipo === 'nuevo' ? 'text-blue-500' : 'text-emerald-600'}>{l.tipo === 'nuevo' ? 'Alta Nueva' : 'Portabilidad'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-6 mt-2 border-t border-slate-100">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-500 font-medium">Total mensual</span>
                    <div className="text-right leading-none"><span className="text-3xl font-extrabold text-slate-900">{calcularTotal()}€</span><span className="text-sm text-slate-500 block mt-1">impuestos inc.</span></div>
                  </div>
                  <button disabled={!esFormularioValido() || enviando} onClick={contratar} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg">
                    {enviando ? "Procesando..." : "Contratar ahora"}
                  </button>
                  {error && <p className="mt-3 text-sm text-red-600 font-semibold text-center">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}