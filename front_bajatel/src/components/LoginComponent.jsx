import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginRequest } from "../api/authApi";

// Componente de inicio de sesión
function LoginComponent() {
    const { login } = useContext(AuthContext);
    // Estados del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await loginRequest(email, password);
            login(data); // guardamos token y usuario
            navigate("/zona-privada");
        } catch (err) {
            setError("Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center w-full bg-blue-600 text-center px-4">
            <div className="max-w-md w-full">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Login</h1>
                <div className="bg-white p-8 rounded-lg shadow-md text-left">
                    {error && <p className="mb-4 text-red-600 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Cargando..." : "Iniciar sesión"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/registro" className="text-blue-600 hover:underline">Crear una cuenta nueva</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
