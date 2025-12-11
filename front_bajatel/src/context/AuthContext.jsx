import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario")) || null
    );

    const login = (data) => {
        // data = { token, usuario }
        setToken(data.token);
        setUsuario(data.usuario);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
    };

    const logout = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    };

    // Función para actualizar solo el objeto de usuario (usada en edición de perfil)
    const updateUser = (newUserData) => {
        setUsuario(newUserData);
        // CRÍTICO: Actualizar también el localStorage
        localStorage.setItem("usuario", JSON.stringify(newUserData));
    };

    return (
        <AuthContext.Provider value={{ token, usuario, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
