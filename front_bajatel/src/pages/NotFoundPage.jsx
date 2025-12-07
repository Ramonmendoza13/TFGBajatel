import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex-grow flex flex-col items-center justify-center w-full bg-gray-50 text-center">
            
            <h1 className="text-7xl md:text-8xl font-extrabold text-blue-600 mb-6">404</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">Página no encontrada</p>
            
            <Link
                to="/"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}