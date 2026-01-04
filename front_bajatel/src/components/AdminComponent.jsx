// Importamos las funciones de la API y los hooks necesarios
import { fetchUsuarios, fetchServicios, cambiarRolUsuario, eliminarUsuario } from "../api/adminApi";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    Pencil,
    Wifi,
    Smartphone,
    Tv,
    Plus,
    Users,
    ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

// Componente del panel de administración
export default function AdminComponent() {
    // Estados para guardar usuarios y servicios
    const [Usuarios, setUsuarios] = useState([]);
    const [servicios, setServicios] = useState({
        fibra: [],
        tv: [],
        movil: [],
    });

    // Obtenemos el token y usuario del contexto
    const { token, usuario } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState(null);


    useEffect(() => {
        fetchUsuarios(token)
            .then((data) => setUsuarios(data))
            .finally(() => setLoading(false));
    }, [token]);

    useEffect(() => {
        fetchServicios(token)
            .then((data) =>
                setServicios({
                    fibra: data.fibra || [],
                    tv: data.tv || [],
                    movil: data.movil || [],
                })
            )
            .finally(() => setLoading(false));
    }, [token]);

    const cambiarRol = async (id) => {
        try {
            await cambiarRolUsuario(id, token);
            // Mensaje global
            localStorage.setItem("adminMessage", "Rol actualizado correctamente");
            window.location.reload();
        } catch (err) {
            //alert("Hubo un error al cambiar el rol");
            console.error(err);
        }
    };

    const handleEliminarUsuario = async (id) => {
        try {
            await eliminarUsuario(id, token);
            // Mensaje global
            localStorage.setItem("adminMessage", "Usuario ELIMINADO correctamente");
            window.location.reload();
        } catch (err) {
            //alert("Hubo un error al cambiar el rol");
            console.error(err);
        }
    };

    // Gestionar los mensajes
    useEffect(() => {
        const msg = localStorage.getItem("adminMessage");

        if (msg) {
            setMensaje(msg);

            setTimeout(() => {
                setMensaje(null);
                localStorage.removeItem("adminMessage");
            }, 5000);
        }
    }, []);

    const estadoDisponible = (estado) => (
        <span
            className={`px-3 py-1 text-xs font-bold rounded-full border ${estado
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-red-100 text-red-700 border-red-200"
                }`}
        >
            {estado ? "Activo" : "Inactivo"}
        </span>
    );

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
        );

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-32 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">



                {/* HEADER DASHBOARD */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            Panel de Administración
                        </h1>
                        <p className="text-gray-500 mt-1">Gestión integral de servicios y usuarios</p>
                    </div>

                    <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                        <div className="bg-blue-600 text-white p-2 rounded-full">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-blue-600 font-bold uppercase">Conectado como</span>
                            <span className="text-sm font-semibold text-gray-800">
                                {usuario.nombre} ({usuario.rol})
                            </span>
                        </div>
                    </div>
                </div>

                {/* ================= SERVICIOS ================= */}
                {mensaje && (
                    <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl shadow mb-6">
                        {mensaje}
                    </div>
                )}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Servicios</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                        {/* ===== FIBRA ===== */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-all duration-300">
                            {/* Cabecera Azul */}
                            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3 text-white">
                                    <Wifi size={24} />
                                    <h3 className="text-lg font-bold">Fibra Óptica</h3>
                                </div>
                                <Link
                                    to="/anadir-opcion-fibra"
                                    className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition backdrop-blur-sm">
                                    <Plus size={20} />
                                </Link>
                            </div>

                            <div className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="bg-blue-50 text-blue-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold">Velocidad</th>
                                            <th className="px-4 py-3 text-left font-semibold">Precio</th>
                                            <th className="px-4 py-3 text-center font-semibold">Estado</th>
                                            <th className="px-4 py-3 text-right font-semibold"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {servicios.fibra.map((f) => (
                                            <tr key={f.id_fibra} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4 font-medium text-gray-700">
                                                    {f.velocidad < 1000
                                                        ? `${f.velocidad} Mbps`
                                                        : `${Math.floor(f.velocidad / 1000)} Gbps`}
                                                </td>
                                                <td className="px-4 py-4 text-blue-600 font-bold">{f.precio}€</td>
                                                <td className="px-4 py-4 text-center">
                                                    {estadoDisponible(f.disponible)}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <Link
                                                        to={`/editar-opcion-fibra/${f.id_fibra}`}
                                                        className="text-gray-400 hover:text-blue-600 transition bg-gray-50 p-2 rounded-full hover:bg-blue-50"
                                                        title="Editar"
                                                    >
                                                        <Pencil size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ===== MÓVIL ===== */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-300">
                            {/* Cabecera Verde */}
                            <div className="bg-green-600 px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3 text-white">
                                    <Smartphone size={24} />
                                    <h3 className="text-lg font-bold">Móvil</h3>
                                </div>
                                <Link
                                    to="/anadir-opcion-movil"
                                    className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition backdrop-blur-sm">
                                    <Plus size={20} />
                                </Link>
                            </div>

                            <div className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="bg-green-50 text-green-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold">Datos</th>
                                            <th className="px-4 py-3 text-left font-semibold">Llamadas</th>
                                            <th className="px-4 py-3 text-left font-semibold">Precio</th>
                                            <th className="px-4 py-3 text-right font-semibold"></th>
                                        </tr>
                                    </thead>
                                    {/* Aquí NO hay overflow-auto ni altura fija, crecerá según contenido */}
                                    <tbody className="divide-y divide-gray-100">
                                        {servicios.movil.map((m) => (
                                            <tr key={m.id_movil} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4 font-bold text-gray-700">
                                                    {m.gb_datos === -1 ? (
                                                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">∞ GB</span>
                                                    ) : (
                                                        `${m.gb_datos} GB`
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {m.min_llamadas === -1 ? (
                                                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">∞ ILIM</span>
                                                    ) : (
                                                        `${m.min_llamadas} min`
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-green-700 font-bold">{m.precio}€</td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex justify-end items-center gap-2">
                                                        {/* Indicador visual pequeño de estado si se desea ahorrar espacio */}
                                                        <div className={`w-2 h-2 rounded-full ${m.disponible ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                        <Link
                                                            to={`/editar-opcion-movil/${m.id_movil}`}
                                                            className="text-gray-400 hover:text-green-600 transition bg-gray-50 p-2 rounded-full hover:bg-green-50"
                                                            title="Editar"
                                                            onClick={() => console.log("Editar móvil", m)}
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ===== TV ===== */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-yellow-100 hover:shadow-2xl transition-all duration-300">
                            {/* Cabecera Amarilla */}
                            <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3 text-white drop-shadow-sm">
                                    <Tv size={24} />
                                    <h3 className="text-lg font-bold">Televisión</h3>
                                </div>
                                <Link
                                    to="/anadir-opcion-tv"
                                    className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition backdrop-blur-sm">
                                    <Plus size={20} />
                                </Link>
                            </div>

                            <div className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="bg-yellow-50 text-yellow-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold">Paquete</th>
                                            <th className="px-4 py-3 text-left font-semibold">Precio</th>
                                            <th className="px-4 py-3 text-center font-semibold">Estado</th>
                                            <th className="px-4 py-3 text-right font-semibold"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {servicios.tv.map((t) => (
                                            <tr key={t.id_tv} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4 font-medium text-gray-800">{t.nombre_paquete}</td>
                                                <td className="px-4 py-4 text-yellow-600 font-bold">{t.precio}€</td>
                                                <td className="px-4 py-4 text-center">
                                                    {estadoDisponible(t.disponible)}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <Link
                                                        to={`/editar-opcion-tv/${t.id_tv}`}
                                                        className="text-gray-400 hover:text-yellow-600 transition bg-gray-50 p-2 rounded-full hover:bg-yellow-50" title="Editar">
                                                        <Pencil size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ================= USUARIOS ================= */}
                <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                <Users size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
                            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                Total: {Usuarios.length}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold">ID</th>
                                    <th className="px-6 py-4 text-left font-bold">Usuario</th>
                                    <th className="px-6 py-4 text-left font-bold">Rol</th>
                                    <th className="px-6 py-4 text-left font-bold">Servicios contratados</th>
                                    <th className="px-6 py-4 text-left font-bold">Fecha contratación</th>
                                    <th className="px-6 py-4 text-left font-bold">Precio total</th>
                                    {usuario.rol === "admin" && (
                                        <th className="px-6 py-4 text-right font-bold">Acciones</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Usuarios.map((u) => (
                                    <tr
                                        key={u.id_usuario}
                                        className="hover:bg-blue-50/30 transition group"
                                    >
                                        {/* ID */}
                                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                                            #{u.id_usuario}
                                        </td>

                                        {/* Usuario */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800 text-base">
                                                    {u.nombre} {u.apellidos}
                                                </span>
                                                <span className="text-gray-500 text-xs">{u.email}</span>
                                            </div>
                                        </td>

                                        {/* Rol */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${u.rol === "admin"
                                                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                                    }`}
                                            >
                                                {u.rol}
                                            </span>
                                        </td>

                                        {/* Servicios contratados / Dirección */}
                                        <td className="px-6 py-4">
                                            {u.contrato?.servicios?.length > 0 ? (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {u.contrato.servicios.map((servicio) => (
                                                        <div key={servicio.id_servicio} className="flex flex-wrap gap-2">

                                                            {/* Fibra - Estilo Azul Suave */}
                                                            {servicio.fibra && (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                                    <Wifi size={12} className="text-blue-600" />
                                                                    {servicio.fibra.velocidad} Mbps
                                                                </span>
                                                            )}

                                                            {/* Líneas móviles - Estilo Esmeralda */}
                                                            {servicio.lineas?.length > 0 && (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                                    <Smartphone size={12} className="text-emerald-600" />
                                                                    {servicio.lineas.length} {servicio.lineas.length === 1 ? 'línea' : 'líneas'}
                                                                </span>
                                                            )}

                                                            {/* TV - Estilo Ámbar/Naranja */}
                                                            {servicio.tv && (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                                    <Tv size={12} className="text-amber-600" />
                                                                    <span className="max-w-[100px] truncate">{servicio.tv.nombre_paquete}</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                                                    Sin servicios
                                                </span>
                                            )}
                                        </td>


                                        {/* Fecha contratación */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {u.contrato ? (
                                                new Date(u.contrato.fecha_alta).toLocaleDateString()
                                            ) : (
                                                "-"
                                            )}
                                        </td>

                                        {/* Precio total */}
                                        <td className="px-6 py-4 font-bold text-green-600">
                                            {u.contrato ? `${u.contrato.precio_total} € / mes` : "-"}
                                        </td>

                                        {/* Acciones */}
                                        {usuario.rol === "admin" && (
                                            <td className="px-6 py-4 text-right">
                                                {u.rol !== "admin" && (
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            onClick={() => cambiarRol(u.id_usuario)}
                                                            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                                                        >
                                                            Rol
                                                        </button>
                                                        <button
                                                            onClick={() => handleEliminarUsuario(u.id_usuario)}
                                                            className="text-red-500 hover:text-red-700 font-semibold hover:underline"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        )}
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}