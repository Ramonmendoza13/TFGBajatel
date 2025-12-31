import { useState } from 'react';

export function useContrato() {
    const [seleccion, setSeleccion] = useState({ fibra: null, tv: null, movil: [], movilEliminadas: [] });
    const [cliente, setCliente] = useState({ calle: '', cp: '', ciudad: '', provincia: '', iban: '' });
    const [errors, setErrors] = useState({});

    const alternarServicio = (categoria, item, idKey) => {
        setSeleccion(prev => ({
            ...prev,
            [categoria]: prev[categoria]?.[idKey] === item[idKey] ? null : item
        }));
    };

    const gestionarMovil = {
        add: () => setSeleccion(prev => ({
            ...prev,
            movil: [...prev.movil, { uid: Date.now() + Math.random(), tarifa: null, tipo: 'nuevo', numPorta: '' }]
        })),
        remove: (uid) => setSeleccion(prev => {
            const linea = prev.movil.find(l => l.uid === uid);
            const nuevasEliminadas = Array.isArray(prev.movilEliminadas) ? [...prev.movilEliminadas] : [];
            if (linea && linea.tipo === 'existente' && linea.numero) {
                // Evitar duplicados
                if (!nuevasEliminadas.includes(linea.numero)) {
                    nuevasEliminadas.push(linea.numero);
                }
            }
            return {
                ...prev,
                movil: prev.movil.filter(l => l.uid !== uid),
                movilEliminadas: nuevasEliminadas
            };
        }),
        update: (uid, campo, valor) => setSeleccion(prev => ({
            ...prev,
            movil: prev.movil.map(l => l.uid === uid ? { ...l, [campo]: valor } : l)
        })),
        toggleTarifa: (uid, tarifa) => setSeleccion(prev => ({
            ...prev,
            movil: prev.movil.map(l => l.uid === uid ? { ...l, tarifa: l.tarifa?.id_movil === tarifa.id_movil ? null : tarifa } : l)
        }))
    };

    const actualizarCliente = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
        // Limpiar error al escribir
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: null }));
        }
    };

    const calcularTotal = () => {
        const precioFibra = parseFloat(seleccion.fibra?.precio || 0);
        const precioTv = parseFloat(seleccion.tv?.precio || 0);
        const precioMovil = seleccion.movil.reduce((acc, l) => acc + parseFloat(l.tarifa?.precio || 0), 0);
        return (precioFibra + precioTv + precioMovil).toFixed(2);
    };

    const esFormularioValido = () => {
        const tieneServicio = seleccion.fibra || seleccion.tv || seleccion.movil.length > 0;
        // Validación inclusiva: soporta 'existente', 'nuevo' y 'porta'
        const movilesOk = seleccion.movil.every(l =>
            l.tarifa && (l.tipo === 'nuevo' || l.tipo === 'existente' || (l.tipo === 'porta' && l.numPorta.length >= 9))
        );
        const clienteOk = Object.values(cliente).every(val => val.trim() !== '');
        return tieneServicio && movilesOk && clienteOk;
    };

    const validarFormulario = () => {
        const newErrors = {};

        if (!cliente.calle.trim()) newErrors.calle = "La dirección es obligatoria";
        if (!cliente.cp.trim()) newErrors.cp = "El código postal es obligatorio";
        else if (!/^\d{5}$/.test(cliente.cp)) newErrors.cp = "CP inválido (5 dígitos)";

        if (!cliente.ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria";
        if (!cliente.provincia.trim()) newErrors.provincia = "La provincia es obligatoria";

        if (!cliente.iban.trim()) newErrors.iban = "El IBAN es obligatorio";
        else if (cliente.iban.replace(/\s/g, '').length < 24) newErrors.iban = "IBAN incompleto";

        if (!seleccion.fibra && !seleccion.tv && seleccion.movil.length === 0) {
            newErrors.general = "Debes contratar al menos un servicio";
        }

        const movilErrors = {};
        let movilError = false;
        seleccion.movil.forEach(l => {
            if (!l.tarifa) {
                movilErrors[l.uid] = "Selecciona una tarifa";
                movilError = true;
            } else if (l.tipo === 'porta' && (!l.numPorta || l.numPorta.length < 9)) {
                movilErrors[l.uid] = "Número de portabilidad inválido";
                movilError = true;
            }
        });
        if (movilError) newErrors.movil = movilErrors;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        seleccion, setSeleccion,
        cliente, setCliente,
        alternarServicio,
        gestionarMovil,
        actualizarCliente,
        calcularTotal,
        esFormularioValido,
        validarFormulario,
        errors
    };
}