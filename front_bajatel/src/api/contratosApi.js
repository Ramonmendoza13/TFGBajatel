import axiosClient from "./axiosClient";

export const getContratoUsuario = async (token) => {
    try {
        const { data } = await axiosClient.get("contratos/mostrar/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data; // devuelve contrato y servicios
    } catch (err) {
        if (err.response && err.response.status === 404) {
            return null; // usuario sin contrato
        }
        throw err;
    }
};
