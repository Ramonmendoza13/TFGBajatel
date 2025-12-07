import { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../assets/imagenes/LOGO_SIMPLE.png';
import { Menu, X, LogIn } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react"; // icono para zona privada


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useContext(AuthContext);


    const navItems = (
        <>
            <Link
                to="/servicios"
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
            >
                Servicios
            </Link>

            <Link
                to="/contratar"
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
            >
                Contratar
            </Link>

            {/* Mostrar Login o Zona Privada según haya token */}
            {!token ? (
                <Link
                    to="/login"
                    className="flex items-center gap-2 py-2.5 px-6 bg-blue-600 text-white font-bold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => setIsOpen(false)}
                >
                    <LogIn className="w-4 h-4" />
                    Login
                </Link>
            ) : (
                <Link
                    to="/zona-privada"
                    className="flex items-center gap-2 py-2.5 px-6 bg-green-600 text-white font-bold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => setIsOpen(false)}
                >
                    <User className="w-4 h-4" />
                    Zona Privada
                </Link>
            )}
        </>
    );

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-100 bg-white/90 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO + NOMBRE */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                            {/* Asegúrate de que el logo tenga buena resolución o usa un SVG */}
                            <img src={Logo} alt="Bajatel Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" />
                            <span className="text-2xl font-extrabold text-blue-900 tracking-tight group-hover:text-blue-700 transition-colors">
                                Bajatel
                            </span>
                        </Link>
                    </div>

                    {/* ENLACES - Versión Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems}
                    </div>

                    {/* BOTÓN HAMBURGUESA - Versión Móvil */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isOpen ? (
                                <X className="w-7 h-7" />
                            ) : (
                                <Menu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MENÚ MÓVIL (Desplegable) */}
            <div
                className={`md:hidden bg-white border-t border-gray-100 absolute w-full left-0 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100 shadow-xl' : 'scale-y-0 opacity-0 h-0'}`}
                id="mobile-menu"
            >
                <div className="px-6 py-6 space-y-4 flex flex-col items-center">
                    {navItems}
                </div>
            </div>

        </nav>
    );
}