export default function FooterComponent() {
    return (
        <footer className="bg-black text-gray-300 py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Logo + Nombre */}
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-white">Bajatel</span>
                </div>

                {/* Enlaces */}
                <div className="flex gap-6 text-sm">
                    <a href="/servicios" className="hover:text-white transition">Servicios</a>
                    <a href="/contratar" className="hover:text-white transition">Contratar</a>
                    <a href="/login" className="hover:text-white transition">Login</a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Bajatel. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
