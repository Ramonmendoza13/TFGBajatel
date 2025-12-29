import { editarPerfil, eliminarCuenta } from "../api/authApi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate para redirigir al borrar
import { AlertTriangle, Trash2, XCircle } from "lucide-react"; // Iconos opcionales para mejor UX

function EditarPerfilComponent() {
    // Añadimos 'logout' para cerrar sesión tras borrar la cuenta
    const { token, usuario, updateUser, logout } = useContext(AuthContext);
    const [email, setEmail] = useState(usuario.email);
    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [mensaje, setMensaje] = useState("");
    
    // Estado para mostrar/ocultar la sección de confirmación
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(""); 

        try {
            const response = await editarPerfil(email, passwordActual, passwordNueva, token);

            if (response.status === 200) {
                updateUser(response.data.usuario);
                setMensaje(response.data.mensaje);
                setPasswordActual('');
                setPasswordNueva('');
                return;
            }

            if (response.status === 422 || response.status === 401) {
                setMensaje(response.data.mensaje);
                return;
            }

            setMensaje(`Error inesperado del servidor: Código ${response.status}`);

        } catch (error) {
            console.error("Error de conexión o servidor:", error);
            setMensaje("Error de conexión con el servidor o error interno inesperado.");
        }
    };

    // Función para procesar la eliminación definitiva
    const handleEliminarDefinitivamente = async () => {
        try {
            await eliminarCuenta(token);
            // Si sale bien, cerramos sesión localmente y redirigimos al inicio
            logout(); 
            navigate("/"); 
        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            setMensaje("No se pudo eliminar la cuenta. Inténtalo más tarde.");
            setMostrarConfirmacion(false);
        }
    };

    return (
        <div className="w-full bg-white pt-28 pb-16 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Editar Perfil
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-50 p-6 rounded-xl shadow mb-8"
            >
                <label className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block font-medium mb-1">Contraseña Actual</label>
                <input
                    type="password"
                    value={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                    placeholder="Introduce tu contraseña actual"
                    className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block font-medium mb-1">Nueva Contraseña (Opcional)</label>
                <input
                    type="password"
                    value={passwordNueva}
                    onChange={(e) => setPasswordNueva(e.target.value)}
                    placeholder="Introduce tu nueva contraseña"
                    className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {mensaje && (
                    <p className={`text-center text-sm mb-4 font-medium ${mensaje.includes('correctamente') ? 'text-green-600' : 'text-red-600'}`}>
                        {mensaje}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
                >
                    Guardar Cambios 
                </button>
            </form>

            {/* --- SECCIÓN ZONA DE PELIGRO --- */}
            <div className="w-full max-w-md border-t pt-8">
                
                {!mostrarConfirmacion ? (
                    // Botón inicial para desplegar la zona de peligro
                    <button
                        onClick={() => setMostrarConfirmacion(true)}
                        className="w-full flex items-center justify-center gap-2 text-red-600 border border-red-200 hover:bg-red-50 font-medium py-3 rounded-xl transition-all"
                    >
                        <Trash2 size={18} />
                        Eliminar mi cuenta
                    </button>
                ) : (
                    // Sección de confirmación desplegada
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-fadeIn">
                        <div className="flex items-center gap-3 text-red-700 font-bold text-lg mb-2">
                            <AlertTriangle className="text-red-600" />
                            ¿Estás seguro?
                        </div>
                        <p className="text-red-800 text-sm mb-4 leading-relaxed">
                            Al eliminar tu cuenta, <strong>perderás el acceso inmediato</strong> a la plataforma. 
                            Todas tus tarifas contratadas se <strong>cancelarán automáticamente</strong> y esta acción 
                            <strong> NO se puede deshacer</strong>.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleEliminarDefinitivamente}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
                            >
                                SÍ, ELIMINAR DEFINITIVAMENTE
                            </button>
                            <button
                                onClick={() => setMostrarConfirmacion(false)}
                                className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 rounded-lg transition"
                            >
                                Cancelar, me quedo
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Link
                to="/zona-privada"
                className="mt-8 text-green-700 font-medium hover:text-green-900 transition flex items-center gap-2"
            >
                ← Volver a Zona Privada
            </Link>
        </div>
    );
}

export default EditarPerfilComponent;