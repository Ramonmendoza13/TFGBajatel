import axiosClient from "./axiosClient";

export const getServiciosDisponibles = async () => {
    const { data } = await axiosClient.get("/servicios/disponibles");
    return data;
};
//PARA FIBRA
export const anadirFibraOpcion = async (velocidad, precio, disponible, token) => {
    const { data } = await axiosClient.post("servicios/fibra", { velocidad, precio, disponible, token },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return data;
};

export const obtenerDatosFibra = async (id, token) => {
    const { data } = await axiosClient.get(
        `/servicios/fibra/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

export const EditarFibra = async (id, velocidad, precio, disponible, token) => {
    const { data } = await axiosClient.put(
        `/servicios/fibra/${id}`,
        {
            velocidad,
            precio,
            disponible
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return data;
};
//PARA MOVIL  
export const anadirFibraMovil = async (gb_datos, minutos, precio, disponible, token) => {
    const { data } = await axiosClient.post(
        "servicios/movil",
        {
            gb_datos,
            minutos,
            precio,
            disponible
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const obtenerDatosMovil = async (id, token) => {
    const { data } = await axiosClient.get(
        `/servicios/movil/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const EditarMovil = async (id, gb_datos, minutos, precio, disponible, token) => {
    const { data } = await axiosClient.put(
        `/servicios/movil/${id}`,
        {
            gb_datos,
            minutos,
            precio,
            disponible
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return data;
};
// TV
export const anadirTvOpcion = async (nombre_paquete, disponible, precio, token) => {
    const { data } = await axiosClient.post(
        "servicios/tv",
        {
            nombre_paquete,
            disponible,
            precio,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};
// Obtener datos de una opción TV
export const obtenerDatosTv = async (id, token) => {
    const { data } = await axiosClient.get(
        `/servicios/tv/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const EditarTv = async (id, nombre_paquete, disponible, precio, token) => {
    const { data } = await axiosClient.put(
        `/servicios/tv/${id}`,
        {
            nombre_paquete,
            disponible,
            precio               
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return data;
};

