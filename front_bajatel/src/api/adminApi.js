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

// Cambiar ROL de Usuario (Si es cliente asciende a gestor y si es gestor desciende usario, ADMIN no puede ser modificado)
export const cambiarRolUsuario = async (id, token) => {
    const { data } = await axiosClient.put(
        `/usuario/${id}/gestionarRol`,
        null, // body vacío
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

//Eliminar usuario
export const eliminarUsuario = async (id, token) => {
    const { data } = await axiosClient.delete(
        `/usuario/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};
