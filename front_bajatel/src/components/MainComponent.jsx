import { Link } from "react-router-dom";
import {
    Headphones,
    Gauge,
    Euro,
    ArrowRight
} from "lucide-react";

// Componente de la página principal
function MainComponent() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50 font-sans">

            {/* BANNER  */}
            <section className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-40 pb-48 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        Conectamos tu <span className="text-blue-300">mundo digital</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                        Disfruta de la mejor conexión a internet con velocidades ultrarrápidas y atención personalizada.
                        Bajatel, tu compañía de confianza.
                    </p>

                    <div className="pt-4">
                        <Link
                            to="/servicios"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/50 hover:bg-blue-50 transition transform hover:scale-105 text-lg"
                        >
                            Nuestros Servicios
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </section>

            {/*  SERVICIOS DESTACADOS */}
            <section className="px-4 -mt-24 relative z-20 mb-20">
                <div className="max-w-6xl mx-auto">
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-6">
                                <Gauge className="text-blue-600" size={40} strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Velocidad Garantizada</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Navega sin interrupciones con hasta <strong>1Gbps</strong> de conexión estable y simétrica.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-6">
                                <Headphones className="text-blue-600" size={40} strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Atención 24/7</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Soporte técnico real, con personas reales, siempre disponibles para ayudarte.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-6">
                                <Euro className="text-blue-600" size={40} strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Precios Competitivos</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Tarifas claras, sin sorpresas en la factura y sin subidas de precio inesperadas.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- SECCIÓN CONTACTO --- */}
            <section className="py-16 px-4 text-center bg-white mb-10">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        ¿Listo para volar?
                    </h2>
                    <p className="text-gray-500 text-xl">
                        Únete a los miles de clientes que ya confían en la red más rápida.
                    </p>

                    <div className="pt-4">
                        <Link
                            to="/contratar"
                            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-12 py-5 rounded-full shadow-xl hover:shadow-blue-600/40 transition-all transform hover:scale-105 hover:-translate-y-1"
                        >
                            Personalizar mi Tarifa Ahora
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- ESTADÍSTICAS --- */}
            <section className="w-full bg-blue-950 text-white py-16 border-t border-blue-900">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8 md:gap-4 px-4">

                    <div className="space-y-2">
                        <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">
                            5k+
                        </p>
                        <p className="text-blue-200 font-medium">Clientes Satisfechos</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">
                            99.9%
                        </p>
                        <p className="text-blue-200 font-medium">Uptime Garantizado</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">
                            24/7
                        </p>
                        <p className="text-blue-200 font-medium">Soporte Técnico</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">
                            15
                        </p>
                        <p className="text-blue-200 font-medium">Años de Experiencia</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default MainComponent;