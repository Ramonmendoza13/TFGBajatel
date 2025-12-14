import axiosClient from "./axiosClient";

// Obtener todos los usuarios (con token de admin)
export const fetchUsuarios = async (token) => {
    const { data } = await axiosClient.get("/usuarios", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data; // data = [usuarios]
}

// Obener todos los servicios
export const fetchServicios = async (token) => {
    const { data } = await axiosClient.get("/servicios/mostrar", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data; // data = [servicios]
}