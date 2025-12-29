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
        // Re-lanzamos el error para tratarlo en el componente
        throw error.response?.data || { error: "Error inesperado" };
    }
};

export const actualizarServicios = async ({
    cliente,
    seleccion,
    token
}) => {
    try {
        // 1. Actualizar datos generales
        const contrato = await axiosClient.put(
            "contratos/actualizar",
            {
                iban: cliente.iban,           // Laravel espera 'iban'
                calle_y_n: cliente.calle,     // Laravel espera 'calle_y_n'
                ciudad: cliente.ciudad,       // Laravel espera 'ciudad'
                provincia: cliente.provincia, // Laravel espera 'provincia'
                codigo_postal: cliente.cp     // Laravel espera 'codigo_postal' (mapeamos desde cliente.cp)
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Gestión Fibra (Igual que antes - UPSERT)
        if (seleccion.fibra) {
            await axiosClient.put(`/contratos/anadirServicioFibra/${seleccion.fibra.id_fibra}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            try { await axiosClient.delete("/contratos/eliminarServicioFibra", { headers: { Authorization: `Bearer ${token}` } }); } catch (e) { }
        }

        // 3. Gestión TV (Igual que antes - UPSERT)
        if (seleccion.tv) {
            await axiosClient.put(`/contratos/anadirServicioTV/${seleccion.tv.id_tv}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            try { await axiosClient.delete("/contratos/eliminarServicioTV", { headers: { Authorization: `Bearer ${token}` } }); } catch (e) { }
        }

        // 4. GESTIÓN DE MÓVILES (Lógica Mejorada)
        for (const linea of seleccion.movil) {

            // Si no tiene tarifa seleccionada, la saltamos
            if (!linea.tarifa) continue;

            // CASO A: LÍNEA NUEVA O PORTABILIDAD -> CREAR (POST)
            if (linea.tipo === 'nuevo' || linea.tipo === 'porta') {
                await axiosClient.post(
                    `/contratos/anadirLineaMovil/${linea.tarifa.id_movil}`,
                    {
                        numero_telefono: linea.tipo === "porta" ? linea.numPorta : null
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            // CASO B: LÍNEA EXISTENTE -> ACTUALIZAR TARIFA (PUT)
            else if (linea.tipo === 'existente') {
                // Enviamos el número actual para identificar la línea y el ID de la nueva tarifa en la URL
                await axiosClient.put(
                    `/contratos/actualizarLineaMovil/${linea.tarifa.id_movil}`,
                    {
                        numero_telefono: linea.numero // Identificador clave
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        }

        return contrato.data;

    } catch (error) {
        throw error.response?.data || { error: "Error al actualizar el contrato" };
    }
};