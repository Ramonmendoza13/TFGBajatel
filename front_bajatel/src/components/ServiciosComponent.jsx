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
        <div className="flex-grow flex flex-col w-full bg-gray-50 font-sans">
            
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-16 px-4 text-center relative overflow-hidden">
                 <div className="max-w-4xl mx-auto space-y-8 relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">
                        Nuestros Servicios
                    </h2>
                    <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
                        Fibra de máxima velocidad, móvil con gigas de sobra y la mejor televisión. 
                        Elige tu combinación perfecta.
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                            <Zap size={20} className="text-yellow-400" />
                            <span className="font-semibold">Instalación Gratuita</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                            <ShieldCheck size={20} className="text-green-400" />
                            <span className="font-semibold">Sin permanencia oculta</span>
                        </div>
                    </div>
                </div>
                {/* Texture Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            {/* MAIN CONTENT - 3 COLUMNS */}
            <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 py-12 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    
                    {/* --- COLUMNA FIBRA --- */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-2xl">
                        <div className="mb-10 pl-4 border-l-8 border-blue-600">
                            <h3 className="text-5xl font-black text-gray-900 uppercase leading-none mb-2 tracking-tighter">FIBRA</h3>
                            <p className="text-sm font-bold text-gray-400 tracking-[0.3em] uppercase">Simétrica</p>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {servicios?.fibra?.map((item) => (
                                <div key={item.id_fibra} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition-opacity duration-500">
                                        <Gauge className="text-blue-600 -mr-6 -mt-6 w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="mb-6">
                                            <h4 className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-2">Velocidad</h4>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-extrabold text-blue-600">{item.velocidad < 1000 ? item.velocidad : item.velocidad/1000}</span>
                                                <span className="text-2xl font-bold text-blue-600">{item.velocidad < 1000 ? 'Mb' : 'Gb'}</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="text-right">
                                                <span className="text-3xl font-bold text-gray-900">{item.precio}€</span>
                                                <span className="text-xs text-gray-500">/mes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA MÓVIL --- */}
                     <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-2xl">
                        <div className="mb-10 pl-4 border-l-8 border-green-600">
                            <h3 className="text-5xl font-black text-gray-900 uppercase leading-none mb-2 tracking-tighter">MÓVIL</h3>
                            <p className="text-sm font-bold text-gray-400 tracking-[0.3em] uppercase">5G + Voz</p>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {servicios?.movil?.map((item) => (
                                <div key={item.id_movil} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative group">
                                    <div className="mb-6">
                                        <h4 className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-2">Datos + Voz</h4>
                                        <div className="flex items-baseline gap-2 flex-wrap">
                                            <div className="flex items-baseline gap-0.5">
                                                <span className="text-3xl font-extrabold text-green-600">{item.gb_datos === -1 ? '∞' : item.gb_datos}</span>
                                                <span className="text-2xl font-bold text-green-600">GB</span>
                                            </div>
                                            <span className="text-2xl font-light text-gray-300">|</span>
                                            <span className="text-xl font-bold text-green-600 uppercase">
                                                {item.min_llamadas === -1 ? 'ILIM.' : `${item.min_llamadas} min`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="text-right">
                                            <span className="text-3xl font-bold text-gray-900">{item.precio}€</span>
                                            <span className="text-xs text-gray-500">/mes</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA TV --- */}
                     <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-2xl">
                        <div className="mb-10 pl-4 border-l-8 border-yellow-500">
                            <h3 className="text-5xl font-black text-gray-900 uppercase leading-none mb-2 tracking-tighter">TV</h3>
                            <p className="text-sm font-bold text-gray-400 tracking-[0.3em] uppercase">Contenido</p>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {servicios?.tv?.map((item) => (
                                <div key={item.id_tv} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                                    <div className="mb-6">
                                        <h4 className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-2">Paquete</h4>
                                        <h4 className="text-3xl font-extrabold text-yellow-500">{item.nombre_paquete}</h4>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                         <div className="text-right">
                                            <span className="text-3xl font-bold text-gray-900">{item.precio}€</span>
                                            <span className="text-xs text-gray-500">/mes</span>
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* CTA FINAL */}
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white mt-16 shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Lo tienes claro?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">Configura tu tarifa en pocos pasos y empieza a disfrutar de la mejor conexión hoy mismo.</p>
                    <Link to="/contratar" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-blue-500/30">
                        Contratar Ahora
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ServiciosComponent;