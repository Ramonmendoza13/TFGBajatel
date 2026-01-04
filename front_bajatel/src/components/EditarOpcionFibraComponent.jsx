import { useParams } from "react-router-dom";
import { obtenerDatosFibra, EditarFibra } from "../api/serviciosApi";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Wifi, Save } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Componente para editar una opción de fibra existente
export default function EditarOpcionFibraComponent() {
    const { id } = useParams();
    const { token } = useContext(AuthContext);

    // Estados del formulario
    const [tarifaFibra, setTarifaFibra] = useState(null);
    const [velocidad, setVelocidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState("true");
    const navigate = useNavigate();


    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await obtenerDatosFibra(id, token);
                setTarifaFibra(response.datos);

                // Rellenamos los campos con los datos actuales
                setVelocidad(response.datos.velocidad);
                setPrecio(response.datos.precio);
                setDisponible(response.datos.disponible.toString());
            } catch (error) {
                console.error(error);
            }
        };

        cargarDatos();
    }, [id, token]);

    // Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convertimos el string a booleano
            const isDisponible = disponible === "true";

            await EditarFibra(
                id,
                Number(velocidad),
                Number(precio),
                isDisponible,
                token
            );
            localStorage.setItem("adminMessage", `Tarifa de Fibra con ID ${id} actualizada correctamente`);

            // Volvemos al panel de admin
            navigate("/admin");
        } catch (err) {
            alert("Hubo un error al guardar la opción de fibra");
            console.error(err);
        } finally {
        }
    };

    if (!tarifaFibra) {
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

                    <div className="bg-white px-8 pt-10 pb-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 mb-6 rotate-3">
                            <Wifi className="h-7 w-7 text-blue-600 -rotate-3" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Editar Opción de Fibra ID: {id}
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Completa los datos para modificar la tarifa.
                        </p>
                    </div>

                    {/* Aviso de cambio de precio */}
                    <div className="px-8 mb-4 text-sm text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl p-4">
                        Si cambias el precio y velocidad, la tarifa de los clientes que ya la tengan contratada también se actualizará.
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
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200"
                            >
                                Guardar cambios
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
