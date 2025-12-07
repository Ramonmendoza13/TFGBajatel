import { useEffect, useState } from "react";
import { getServiciosDisponibles } from "../api/serviciosApi";
import { Gauge, Smartphone, Tv, CheckCircle, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function ServiciosComponent() {
    const [servicios, setServicios] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServiciosDisponibles()
            .then(data => setServicios(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="flex-grow flex flex-col w-full bg-gray-50 ">
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-40 pb-32 md:pt-48 md:pb-48 px-4 text-center relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
                        NUESTROS SERVICIOS
                    </h2>
                    <p className="text-blue-100 text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Fibra de máxima velocidad, móvil con gigas de sobra y la mejor televisión. 
                        Elige tu combinación perfecta.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium">
                        <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                            <Zap size={20} className="text-yellow-400" /> Instalación Gratuita
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                            <ShieldCheck size={20} className="text-green-400" /> Sin permanencia oculta
                        </div>
                    </div>
                </div>
            </div>

            {/* GRID DE TARJETAS*/}
            <div className="max-w-7xl mx-auto px-4 -mt-20 md:-mt-24 pb-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* --- FIBRA --- */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="bg-blue-50 p-6 border-b border-blue-100 flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                <Gauge size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Fibra Óptica</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {servicios?.fibra?.map((item) => (
                                <div key={item.id_fibra} className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition cursor-pointer group bg-white">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-xl text-gray-700 group-hover:text-blue-600 transition">
                                            {item.velocidad}
                                        </span>
                                        {item.disponible && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase tracking-wide">Activo</span>}
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-gray-500 text-sm font-medium">Simétrica</div>
                                        <div className="text-right">
                                            <span className="text-3xl font-extrabold text-gray-900">{item.precio}€</span>
                                            <span className="text-xs text-gray-500 ml-1">/mes</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- MÓVIL --- */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="bg-blue-50 p-6 border-b border-blue-100 flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                <Smartphone size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Móvil</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {servicios?.movil?.map((item) => (
                                <div key={item.id_movil} className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition cursor-pointer group bg-white">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-bold text-xl text-gray-700 group-hover:text-blue-600 transition">
                                            {item.gb_datos}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">
                                        <CheckCircle size={16} className="text-blue-500" /> 
                                        <span className="font-medium">{item.min_llamadas} min. llamadas</span>
                                    </div>
                                    <div className="text-right border-t border-gray-100 pt-3">
                                        <span className="text-3xl font-extrabold text-gray-900">{item.precio}€</span>
                                        <span className="text-xs text-gray-500 ml-1">/mes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- TV --- */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="bg-blue-50 p-6 border-b border-blue-100 flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                <Tv size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Televisión</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {servicios?.tv?.map((item) => (
                                <div key={item.id_tv} className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition cursor-pointer group bg-white">
                                    <h4 className="font-bold text-xl text-gray-700 mb-2 group-hover:text-blue-600 transition">
                                        Pack {item.nombre_paquete}
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                        Disfruta del mejor entretenimiento para toda la familia.
                                    </p>
                                    <div className="text-right border-t border-gray-100 pt-3">
                                        <span className="text-3xl font-extrabold text-gray-900">{item.precio}€</span>
                                        <span className="text-xs text-gray-500 ml-1">/mes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* LINK a contratar */}
                <div className="mt-20 text-center">
                    <p className="text-gray-600 text-lg mb-6">
                        ¿No sabes qué elegir? Combina servicios y <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">ahorra hasta un 20%</span>
                    </p>
                    <Link
                        to="/contratar"
                        className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-12 py-5 rounded-full shadow-xl hover:shadow-blue-600/40 transition-all transform hover:scale-105 hover:-translate-y-1"
                    >
                        Personalizar mi Tarifa Ahora
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ServiciosComponent;