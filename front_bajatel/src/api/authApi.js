import axiosClient from "./axiosClient";

export const loginRequest = async (email, password) => {
    const { data } = await axiosClient.post("usuario/login", { email, password });
    return data; // data = { token, usuario }
};

export const logoutRequest = async (token) => {
    const { data } = await axiosClient.post(
        "usuario/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

export const editarPerfil = async (email, passwordActual, passwordNueva = "", token) => {
    const data = {
        email,
        passwordActual,
        passwordNueva,
    };

    try {
        const response = await axiosClient.put("/usuario/editarPerfil", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // Permite que Axios devuelva el control al 'try' para códigos < 500
            validateStatus: (status) => status >= 200 && status < 500, 
        });
        
        // Devuelve la respuesta completa (incluyendo data, status, etc.)
        return response; 
        
    } catch (error) {
        // Esto solo atrapará errores de red, de configuración o 5xx.
        throw error;
    }
};

export const eliminarCuenta = async (token) => {
    try {
        const response = await axiosClient.delete("/usuario/eliminarCuenta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};