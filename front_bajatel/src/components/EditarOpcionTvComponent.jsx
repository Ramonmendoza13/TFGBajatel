import { useParams, Link, useNavigate } from "react-router-dom";
import { obtenerDatosTv, EditarTv } from "../api/serviciosApi";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Tv, Save } from "lucide-react";

export default function EditarOpcionTvComponent() {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tarifaTv, setTarifaTv] = useState(null);
    const [nombrePaquete, setNombrePaquete] = useState("");
    const [disponible, setDisponible] = useState("true");
    const [precio, setPrecio] = useState("");


    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await obtenerDatosTv(id, token);
                setTarifaTv(response.datos);
                setNombrePaquete(response.datos.nombre_paquete);
                setDisponible(response.datos.disponible.toString());
                setPrecio(response.datos.precio);
            } catch (error) {
                console.error(error);
            }
        };

        cargarDatos();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isDisponible = disponible === "true";

            await EditarTv(
                id,
                nombrePaquete,
                isDisponible,
                Number(precio),
                token
            );
            localStorage.setItem("adminMessage",`Tarifa de TV con ID ${id} actualizada correctamente`);
            navigate("/admin");
        } catch (err) {
            alert("Hubo un error al guardar la opción de TV");
            console.error(err);
        }
    };

    if (!tarifaTv) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                Cargando...
            </div>
        );
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 py-16 md:py-24 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                    {/* Cabecera */}
                    <div className="bg-white px-8 pt-10 pb-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 mb-6 rotate-3">
                            <Tv className="h-7 w-7 text-blue-600 -rotate-3" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Editar Paquete TV ID: {id}
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Modifica el nombre y precio del paquete.
                        </p>
                    </div>

                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                        {/* Nombre */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Nombre del paquete
                            </label>
                            <input
                                required
                                type="text"
                                value={nombrePaquete}
                                onChange={(e) => setNombrePaquete(e.target.value)}
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                            />
                        </div>

                        {/* Visibilidad */}
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

                        {/* Precio */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                Precio mensual (€)
                            </label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="block w-full px-4 py-3.5 bg-slate-50 border-slate-100 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none border"
                            />
                        </div>

                        {/* Botón */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200"
                            >
                                <Save className="h-5 w-5" />
                                Guardar cambios
                            </button>
                        </div>
                    </form>

                    <div className="pb-6 text-center">
                        <Link
                            to="/admin"
                            className="inline-block mt-6 text-green-700 font-medium hover:text-green-900 transition"
                        >
                            ← Volver al Panel de Administración
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
