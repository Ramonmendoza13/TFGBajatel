import { Wifi, Save, Loader2 } from 'lucide-react';
import { anadirFibraOpcion } from "../api/serviciosApi";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function AnadirOpcionFibraComponent() {
    // 1. Definimos los estados para capturar los valores
    const [velocidad, setVelocidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState("true"); // Guardamos como string para el select
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 2. Convertimos disponible a booleano real antes de enviar
            const isDisponible = disponible === "true";

            await anadirFibraOpcion(velocidad, precio, isDisponible, token);
            localStorage.setItem("adminMessage", "Opcion de Fibra añadida correctamente");

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
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden ">

                    <div className="bg-white px-8 pt-10 pb-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 mb-6 rotate-3">
                            <Wifi className="h-7 w-7 text-blue-600 -rotate-3" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Nueva Opción de Fibra
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Completa los datos para el nuevo plan.
                        </p>
                    </div>

                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                        {/* Velocidad */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Velocidad (Mbps)
                            </label>
                            <input
                                required
                                type="number"
                                value={velocidad}
                                onChange={(e) => setVelocidad(e.target.value)}
                                placeholder="Ej: 300"
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
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
                                placeholder="Ej: 29.99"
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Visibilidad
                            </label>
                            <select
                                value={disponible}
                                onChange={(e) => setDisponible(e.target.value)}
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border appearance-none cursor-pointer"
                            >
                                <option value="true">Activo / Disponible</option>
                                <option value="false">Pausado / Inactivo</option>
                            </select>
                        </div>

                        {/* Botón */}
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
                                        Guardar cambios
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="pb-6 text-center">
                        <Link
                            to="/admin"
                            className="inline-block mt-6 text-green-700 font-medium hover:text-green-900 transition"
                        >
                            ← Volver a Panel de Administración
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}