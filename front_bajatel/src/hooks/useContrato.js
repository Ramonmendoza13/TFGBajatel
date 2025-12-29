import { useState } from 'react';

export function useContrato() {
    const [seleccion, setSeleccion] = useState({ fibra: null, tv: null, movil: [] });
    const [cliente, setCliente] = useState({ calle: '', cp: '', ciudad: '', provincia: '', iban: '' });

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
        remove: (uid) => setSeleccion(prev => ({
            ...prev,
            movil: prev.movil.filter(l => l.uid !== uid)
        })),
        update: (uid, campo, valor) => setSeleccion(prev => ({
            ...prev,
            movil: prev.movil.map(l => l.uid === uid ? { ...l, [campo]: valor } : l)
        })),
        toggleTarifa: (uid, tarifa) => setSeleccion(prev => ({
            ...prev,
            movil: prev.movil.map(l => l.uid === uid ? { ...l, tarifa: l.tarifa?.id_movil === tarifa.id_movil ? null : tarifa } : l)
        }))
    };

    const actualizarCliente = (e) => setCliente({ ...cliente, [e.target.name]: e.target.value });

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

    return {
        seleccion, setSeleccion,
        cliente, setCliente,
        alternarServicio,
        gestionarMovil,
        actualizarCliente,
        calcularTotal,
        esFormularioValido
    };
}