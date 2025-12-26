import { useContext, useState } from "react";
import { Smartphone, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { anadirFibraMovil } from "../api/serviciosApi";
import { useNavigate } from "react-router-dom";



export default function AnadirOpcionMovilComponent() {

    const [gb_datos, setDatos] = useState('');
    const [minutos, setLlamadas] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponible, setDisponible] = useState('true');
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 2. Convertimos disponible a booleano real antes de enviar
            const isDisponible = disponible === "true";

            await anadirFibraMovil(gb_datos, minutos, precio, isDisponible, token);
            localStorage.setItem("adminMessage", `Tarifa de Movil creada correctamente`);

            // Si sale bien, vamos a la zona privada
            navigate("/admin");
        } catch (err) {
            alert("Hubo un error al guardar la opción de fibra");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 py-16 md:py-24 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                    {/* Cabecera con Icono */}
                    <div className="bg-white px-8 pt-10 pb-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 mb-6 rotate-3">
                            <Smartphone className="h-7 w-7 text-blue-600 -rotate-3" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Nueva Tarifa Móvil
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Configura los gigas y el precio del terminal.
                        </p>
                    </div>

                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>

                        {/* Datos (GB) */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Datos (GB Móviles)
                            </label>
                            <input
                                required
                                type="number"
                                value={gb_datos}
                                onChange={(e) => setDatos(e.target.value)}
                                placeholder="Ej: 50"
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
                        </div>

                        {/* Llamadas */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Minutos de Llamadas
                            </label>
                            <input
                                required
                                type="number"
                                value={minutos}
                                onChange={(e) => setLlamadas(e.target.value)}
                                placeholder="Ej: 500"
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
                            <p className="mt-2 ml-1 text-[10px] text-slate-400 italic">
                                * Introduce un número negativo (ej: -1) para indicar <b>Llamadas Ilimitadas</b>.
                            </p>
                        </div>

                        {/* Precio */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Precio Mensual (€)
                            </label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                placeholder="Ej: 12.90"
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
                        </div>

                        {/* Disponibilidad */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Disponibilidad
                            </label>
                            <select
                                value={disponible}
                                onChange={(e) => setDisponible(e.target.value)}
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border appearance-none cursor-pointer"
                            >
                                <option value="true">Visible en la web</option>
                                <option value="false">Oculto / No disponible</option>
                            </select>
                        </div>

                        {/* Botón Guardar */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Guardar Tarifa
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Link de retorno */}
                    <div className="pb-8 text-center">
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-2 text-slate-500 font-medium hover:text-blue-600 transition-colors text-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al Panel de Administración
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

