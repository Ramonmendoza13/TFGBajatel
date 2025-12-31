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

export const cancelarContratoUsuario = async (token) => {
    try {
        const { data } = await axiosClient.delete("contratos/cancelar/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data; // devuelve mensaje de éxito
    } catch (err) {
        throw err;
    }
}

/**
 * Crea el contrato y añade los servicios seleccionados
 */
export const contratarServicios = async ({
    cliente,
    seleccion,
    token
}) => {
    try {
        // 1. Crear contrato
        const contrato = await axiosClient.post(
            "contratos/crear",
            {
                iban: cliente.iban,
                calle_y_n: cliente.calle,
                ciudad: cliente.ciudad,
                provincia: cliente.provincia,
                codigo_postal: cliente.cp
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        // 2. Añadir Fibra (si existe)
        if (seleccion.fibra) {
            await axiosClient.post(
                `/contratos/anadirServicioFibra/${seleccion.fibra.id_fibra}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }

        // 3. Añadir TV (si existe)
        if (seleccion.tv) {
            await axiosClient.post(
                `/contratos/anadirServicioTV/${seleccion.tv.id_tv}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }

        // 4. Añadir líneas móviles (0, 1 o N)
        for (const linea of seleccion.movil) {
            if (!linea.tarifa) continue;

            await axiosClient.post(
                `/contratos/anadirLineaMovil/${linea.tarifa.id_movil}`,
                {
                    numero_telefono:
                        linea.tipo === "porta" ? linea.numPorta : null
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }

        return contrato.data;

    } catch (error) {
        // Re-lanzamos el error original para que el componente pueda inspeccionar response/status
        throw error;
    }
};

export const actualizarServicios = async ({ cliente, seleccion, token }) => {
    try {
        // 1. Actualizar datos generales
        await axiosClient.put(
            "contratos/actualizar",
            {
                iban: cliente.iban,
                calle_y_n: cliente.calle,
                ciudad: cliente.ciudad,
                provincia: cliente.provincia,
                codigo_postal: cliente.cp
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Fibra
        if (seleccion.fibra) {
            await axiosClient.put(
                `/contratos/anadirServicioFibra/${seleccion.fibra.id_fibra}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } else {
            try { await axiosClient.delete("/contratos/eliminarServicioFibra", { headers: { Authorization: `Bearer ${token}` } }); } catch { }
        }

        // 3. TV
        if (seleccion.tv) {
            await axiosClient.put(
                `/contratos/anadirServicioTV/${seleccion.tv.id_tv}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } else {
            try { await axiosClient.delete("/contratos/eliminarServicioTV", { headers: { Authorization: `Bearer ${token}` } }); } catch { }
        }

        // 4. Líneas móviles

        // Normalizar la estructura: aceptar tanto el formato antiguo (array) como el nuevo { eliminadas, actuales }
        const movil = Array.isArray(seleccion.movil)
            ? { eliminadas: seleccion.movilEliminadas || [], actuales: seleccion.movil }
            : seleccion.movil;

        // 4a. Eliminar las que se han marcado
        for (const numero of movil.eliminadas) {
            await axiosClient.delete(`/contratos/eliminarLineaMovil/${numero}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }

        // 4b. Añadir o actualizar las que quedan
        for (const linea of movil.actuales) {
            if (linea.tipo === 'nuevo' || linea.tipo === 'porta') {
                await axiosClient.post(
                    `/contratos/anadirLineaMovil/${linea.tarifa.id_movil}`,
                    { numero_telefono: linea.tipo === "porta" ? linea.numPorta : null },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else if (linea.tipo === 'existente') {
                await axiosClient.put(
                    `/contratos/actualizarLineaMovil/${linea.tarifa.id_movil}`,
                    { numero_telefono: linea.numero },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        }

        return true;

    } catch (error) {
        // Re-lanzamos el error original para que el componente pueda inspeccionar response/status
        throw error;
    }
};

export const getDetallesContrato = async (token) => {
};