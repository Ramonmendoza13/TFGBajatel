import { useState, useContext } from "react";
import { registroRequest } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Componente de registro de nuevos usuarios
export default function RegistroComponent() {
  const navigate = useNavigate();
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data =  await registroRequest(nombre, apellidos, dni, email, password);
      // Guardamos token y usuario
      login(data);
      // Navegar a zona privada
      navigate("/zona-privada");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Errores de validación del backend
        setErrors(error.response.data.errores);
      } else {
        console.error(error);
        setErrors({
          general: "Ocurrió un error en el registro. Inténtalo más tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center w-full bg-blue-600 text-center px-4 py-12">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Registro
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-md text-left">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <input
                type="text"
                placeholder="Tus apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.apellidos ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.apellidos && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.apellidos[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <input
                type="text"
                placeholder="12345678X"
                value={dni}
                required
                maxLength={9} 
                onChange={(e) => setDni(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dni ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dni && (
                <p className="text-red-500 text-xs mt-1">{errors.dni[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-bold transition-colors shadow-lg hover:shadow-xl"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-font-semibold"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
