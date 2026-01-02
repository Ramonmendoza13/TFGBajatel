import { useContext, useState, useEffect  } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutRequest } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Pencil } from "lucide-react";
import ContratoComponent from "./ContratoComponent";
import { Link } from "react-router-dom";

function ZonaPrivadaComponent() {
  const { token, usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState(null);

  const handleLogout = async () => {
    try {
      await logoutRequest(token);
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  // Gestionar los mensajes
  useEffect(() => {
    const msg = localStorage.getItem("adminMessage");

    if (msg) {
      setMensaje(msg);

      setTimeout(() => {
        setMensaje(null);
        localStorage.removeItem("adminMessage");
      }, 5000);
    }
  }, []);

  return (
    <div className="w-full bg-white pt-28 pb-16">

      {mensaje && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl shadow mb-6">
          {mensaje}
        </div>
      )}

      {usuario && (
        <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Bloque Izquierdo: Icono + Bienvenida + Editar */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <User className="w-12 h-12 text-blue-600" />

            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenido <span className="font-extrabold text-blue-700">{usuario.nombre}</span>
              </h1>

              {/* ✏️ BOTÓN DE EDITAR PERFIL */}
              <Link
                to="/editar-perfil"
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 font-semibold text-sm rounded-md border border-blue-300 hover:bg-blue-200 transition whitespace-nowrap"
              >
                <Pencil size={16} /> Editar Perfil
              </Link>
            </div>
          </div>

          {/* Bloque Derecho: Acciones (Admin + Logout) */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            {(usuario.rol === "admin" || usuario.rol === "gestor") && (
              <Link
                to="/admin"
                className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 font-semibold text-sm rounded-md border border-green-300 hover:bg-green-200 transition whitespace-nowrap"
              >
                <Pencil size={16} /> Panel Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-600 font-semibold rounded-md border border-red-300 hover:bg-red-200 transition whitespace-nowrap"
            >
              <LogOut size={18} /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      <ContratoComponent />
    </div>
  );
}

export default ZonaPrivadaComponent;
