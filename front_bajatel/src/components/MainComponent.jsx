import { Link } from "react-router-dom";
import {
    PhoneCall,
    Headphones,
    Gauge,
    Euro,
} from "lucide-react";

function MainComponent() {
    return (
        <div className="flex flex-col w-full">

            {/* BANNER */}
            <section className="w-full bg-blue-600 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto grid  items-center gap-12">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Conectamos tu mundo digital
                        </h1>

                        <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
                            Disfruta de la mejor conexión a internet con velocidades ultrarrápidas y atención personalizada.
                            Bajatel, tu compañía de confianza.
                        </p>

                        <Link to="/contratar" className="inline-block bg-white text-blue-600 font-semibold px-7 py-4 rounded-xl shadow-lg hover:bg-slate-100 transition text-xl"> Contratar </Link>
                    </div>                    
                </div>
            </section>

            {/* servicios destacados */}
            <section className="py-10 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Por qué elegir Bajatel?</h2>
                <p className="text-gray-600 text-lg mb-8">
                    Soluciones de telecomunicaciones fiables y accesibles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">

                    <div className="p-5 rounded-xl shadow bg-white flex flex-col items-center">
                        <Gauge className="text-blue-600 mb-2" size={50} strokeWidth={1.5} />
                        <h3 className="text-xl font-semibold">Velocidad Garantizada</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Hasta 1Gbps de conexión estable.
                        </p>
                    </div>

                    <div className="p-5 rounded-xl shadow bg-white flex flex-col items-center">
                        <Headphones className="text-blue-600 mb-2" size={50} strokeWidth={1.5} />
                        <h3 className="text-xl font-semibold">Atención 24/7</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Soporte técnico siempre disponible.
                        </p>
                    </div>

                    <div className="p-5 rounded-xl shadow bg-white flex flex-col items-center">
                        <Euro className="text-blue-600 mb-2" size={50} strokeWidth={1.5} />
                        <h3 className="text-xl font-semibold">Precios Competitivos</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Tarifas claras y sin sorpresas.
                        </p>
                    </div>

                </div>
            </section>

            {/* Contacto */}
            <section className="py-10 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    ¿Listo para cambiar tu conexión?
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                    Miles de clientes confían en nosotros.
                </p>

                <a
                    href="tel:+34666666666"
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition text-lg inline-flex items-center gap-2"
                >
                    <PhoneCall size={22} strokeWidth={2} />
                    Llamar Ahora
                </a>
            </section>

            {/* ESTADÍSTICAS */}
            <section className="w-full bg-gray-900 text-white py-12">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">

                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">5,000+</p>
                        <p className="text-sm opacity-80">Clientes Satisfechos</p>
                    </div>

                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">99.9%</p>
                        <p className="text-sm opacity-80">Tiempo de Actividad</p>
                    </div>

                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">24/7</p>
                        <p className="text-sm opacity-80">Soporte Técnico</p>
                    </div>

                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">15</p>
                        <p className="text-sm opacity-80">Años de Experiencia</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default MainComponent;
