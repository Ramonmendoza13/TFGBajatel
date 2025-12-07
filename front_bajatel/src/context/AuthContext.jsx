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

    return (
        <AuthContext.Provider value={{ token, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
