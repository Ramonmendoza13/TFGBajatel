import { editarPerfil } from "../api/authApi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function EditarPerfilComponent() {
    const { token, usuario, updateUser } = useContext(AuthContext);
    const [email, setEmail] = useState(usuario.email);
    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(""); // Limpiar mensaje anterior

        try {
            // Recibe la respuesta completa (status, data)
            const response = await editarPerfil(email, passwordActual, passwordNueva, token);

            // 1. ÉXITO (HTTP 200)
            if (response.status === 200) {
                // LLAMADA CLAVE: Actualiza el estado global de usuario
                updateUser(response.data.usuario);

                setMensaje(response.data.mensaje); // Muestra: "Perfil actualizado correctamente."
                setPasswordActual('');
                setPasswordNueva('');
                // Si el email no cambió, no es necesario hacer nada más

                return;
            }

            // 2. ERROR DE VALIDACIÓN (HTTP 422) o CONTR. INCORRECTA (HTTP 401)
            if (response.status === 422 || response.status === 401) {
                // response.data.mensaje contiene el mensaje de error de Laravel
                setMensaje(response.data.mensaje);
                return;
            }

            // 3. Otros 4xx inesperados
            setMensaje(`Error inesperado del servidor: Código ${response.status}`);

        } catch (error) {
            // 4. ERRORES NO CONTROLADOS (Red o Servidor 5xx)
            console.error("Error de conexión o servidor:", error);
            setMensaje("Error de conexión con el servidor o error interno inesperado.", error);
        }
    };

    return (
        <div className="w-full bg-white pt-28 pb-16 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Editar Perfil
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-50 p-6 rounded-xl shadow"
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
                    <p className="text-center text-sm text-gray-700 mb-4">{mensaje}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
                >
                    Guardar Cambios 
                </button>
            </form>

            <Link
                to="/zona-privada"
                className="mt-6 text-green-700 font-medium hover:text-green-900 transition"
            >
                ← Volver a Zona Privada
            </Link>
        </div>
    );
}

export default EditarPerfilComponent