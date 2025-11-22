import { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../assets/imagenes/LOGO_SIMPLE.png';
import { Menu, X, LogIn } from 'lucide-react';


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = (
        <>
            <Link to="/servicios" className="block md:inline-block py-2 px-3 hover:text-sky-500 transition duration-300" > Servicios  </Link>
            <Link to="/contratar" className="block md:inline-block py-2 px-3 hover:text-sky-500 transition duration-300"> Contratar </Link>
            {/* Botón Principal */}
            <Link to="/login" className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-full shadow-md hover:bg-sky-500 transition duration-300 transform hover:scale-105">
                <LogIn className="w-5 h-5" /> Login
            </Link>
        </>
    );

    return (
        <nav className="w-full bg-white text-gray-700 border-b border-gray-200 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LOGO + NOMBRE */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 transition duration-300 hover:text-sky-500" >
                            <img src={Logo} alt="Bajatel Logo" className="w-10 h-10 object-contain" />
                            <span className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-sky-500"> Bajatel</span>
                        </Link>
                    </div>

                    {/* ENLACES - Versión Desktop */}
                    <div className="hidden md:flex items-center gap-6 text-base font-medium">
                        {navItems}
                    </div>

                    {/* BOTÓN HAMBURGUESA - Versión Móvil */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-500 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 rounded-md p-2"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            {isOpen ? (
                                <X className="w-8 h-8 text-blue-600" />
                            ) : (
                                <Menu className="w-8 h-8 text-blue-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MENÚ MÓVIL (Desplegable) */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
                    <Link to="/servicios" className="text-gray-700 hover:bg-sky-50 hover:text-sky-500 block px-3 py-2 rounded-md text-base font-medium text-center mx-auto" onClick={() => setIsOpen(false)}>Servicios</Link>
                    <Link to="/contratar" className="text-gray-700 hover:bg-sky-50 hover:text-sky-500 block px-3 py-2 rounded-md text-base font-medium text-center mx-auto" onClick={() => setIsOpen(false)}>Contratar</Link>
                    <Link to="/login" className="text-center w-full mt-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-full shadow-md hover:bg-blue-700 transition duration-300" onClick={() => setIsOpen(false)}>Login</Link>
                </div>
            </div>

        </nav>
    );
}