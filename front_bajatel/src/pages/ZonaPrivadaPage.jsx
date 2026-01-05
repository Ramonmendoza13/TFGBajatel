import ZonaPrivadaComponent from "../components/ZonaPrivadaComponent";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ZonaPrivadaPage() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirigir al login si no hay token (verificar contexto y localStorage)
    useEffect(() => {
        const tokenEnStorage = localStorage.getItem("token");
        const isLoggingOut = sessionStorage.getItem("isLoggingOut");
        
        // No redirigir si está en proceso de logout
        if (!token && !tokenEnStorage && !isLoggingOut) {
            navigate("/login");
        }
    }, [token, navigate]);

    // Si no hay token en ningún sitio, no renderizar nada (se redirige)
    const tokenEnStorage = localStorage.getItem("token");
    if (!token && !tokenEnStorage) {
        return null;
    }

    return (
        <>
            <Helmet defer={false}>
                <title>Zona Privada - Bajatel</title>
            </Helmet>
            <ZonaPrivadaComponent />
        </>
    );
}
