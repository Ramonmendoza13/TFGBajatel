import HeaderComponent from "../components/HeaderComponent";
import { Link } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";


export default function NotFoundPage() {
    return (
        <>
            <HeaderComponent />
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-6 text-center">
                <h1 className="text-7xl md:text-8xl font-extrabold text-blue-600 mb-4">404</h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">Página no encontrada</p>
                <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"> Volver al inicio </Link>
            </div>
            <FooterComponent />
        </>
    );
}
