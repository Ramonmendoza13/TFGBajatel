import {
    Smartphone, Tv, Plus, Trash2, CheckCircle, Wifi,
    Phone, ArrowRightLeft, MapPin, CreditCard, AlertTriangle
} from "lucide-react";

// --- COMPONENTES UI COMPARTIDOS ---

export const LoadingScreen = () => (
    <div className="flex justify-center items-center h-screen pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>
);

export const Header = ({ titulo, subtitulo }) => (
    <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900">{titulo}</h1>
        <p className="mt-2 text-lg text-slate-500">{subtitulo}</p>
    </div>
);

export const Seccion = ({ icono: Icon, titulo, subtitulo, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex gap-4 mb-6 border-b pb-4">
            <div className="bg-blue-50 p-3 rounded-xl"><Icon className="text-blue-600" size={24} /></div>
            <div><h2 className="text-xl font-bold">{titulo}</h2><p className="text-sm text-slate-500">{subtitulo}</p></div>
        </div>
        {children}
    </div>
);

export const OpcionCard = ({ activo, onClick, titulo, subtitulo, precio, compact, legacy }) => (
    <div onClick={onClick} className={`relative cursor-pointer rounded-xl border-2 flex flex-col justify-between transition-all ${compact ? 'p-3 min-h-[80px]' : 'p-5 min-h-[120px]'} ${activo ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-blue-300"} ${legacy ? "opacity-80" : ""}`}>
        {activo && <CheckCircle className="absolute top-2 right-2 text-blue-600" size={compact ? 16 : 20} />}
        {legacy && (
            <div className="absolute -top-3 left-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                <AlertTriangle size={10} /> NO DISPONIBLE
            </div>
        )}
        <div>
            <span className={`block font-bold text-slate-800 ${compact ? 'text-lg' : 'text-2xl'}`}>{titulo}</span>
            <span className="text-xs font-medium text-slate-500 uppercase">{subtitulo}</span>
        </div>
        <div className={`flex flex-col ${!compact && 'mt-4 border-t pt-2'}`}>
            <span className={`font-bold text-slate-900 ${compact ? 'text-lg' : 'text-xl'}`}>{precio}€</span>
        </div>
    </div>
);

export const LineaMovilCard = ({ linea, index, ofertas, actions }) => (
    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-inner">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">LÍNEA {index + 1}</span>
                {!linea.tarifa && <span className="text-xs text-red-500 font-medium animate-pulse">Elige tarifa</span>}
                {linea.tipo === 'existente' && <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10} /> ACTIVA</span>}
            </div>
            <button onClick={() => actions.remove(linea.uid)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {ofertas.map(m => (
                <OpcionCard key={m.id_movil} compact
                    activo={linea.tarifa?.id_movil === m.id_movil}
                    onClick={() => actions.toggleTarifa(linea.uid, m)}
                    titulo={`${m.gb_datos === -1 ? "∞" : m.gb_datos} GB`}
                    subtitulo={m.min_llamadas === -1 ? "Ilimitadas" : `${m.min_llamadas} min`}
                    precio={m.precio}
                    legacy={m._legacy}
                />
            ))}
        </div>

        <div className="border-t border-slate-200 pt-4">
            {linea.tipo === 'existente' ? (
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
                    <div className="bg-slate-100 p-2 rounded-full"><Phone size={16} className="text-slate-500" /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Número asociado</p>
                        <p className="text-sm font-bold text-slate-800 font-mono">{linea.numero}</p>
                    </div>
                    <div className="ml-auto text-xs text-slate-400 italic">Esta línea ya está en tu contrato</div>
                </div>
            ) : (
                <>
                    <p className="text-sm font-semibold text-slate-700 mb-3">¿Qué hacemos con el número?</p>
                    <div className="flex gap-3 mb-3">
                        <OpcionRadio active={linea.tipo === 'nuevo'} onClick={() => actions.update(linea.uid, 'tipo', 'nuevo')} icon={Plus} label="Nuevo número" color="blue" />
                        <OpcionRadio active={linea.tipo === 'porta'} onClick={() => actions.update(linea.uid, 'tipo', 'porta')} icon={ArrowRightLeft} label="Portabilidad" color="emerald" />
                    </div>
                    {linea.tipo === 'porta' && (
                        <div className="relative animate-fadeIn">
                            <Phone size={16} className="absolute top-3 left-3 text-slate-400" />
                            <input type="tel" maxLength={9} placeholder="Nº a portar (ej: 600...)" value={linea.numPorta} onChange={(e) => actions.update(linea.uid, 'numPorta', e.target.value.replace(/\D/g, ''))}
                                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
);

export const OpcionRadio = ({ active, onClick, icon: Icon, label, color }) => (
    <div onClick={onClick} className={`flex-1 flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${active ? `border-${color}-500 bg-white ring-1 ring-${color}-500` : 'border-slate-200 bg-white'}`}>
        <div className={`p-1.5 rounded-full ${active ? `bg-${color}-100 text-${color}-600` : 'bg-slate-100 text-slate-400'}`}><Icon size={16} /></div>
        <span className={`text-sm font-bold ${active ? `text-${color}-700` : 'text-slate-600'}`}>{label}</span>
    </div>
);

import Cleave from "cleave.js/react";

export const InputGroup = ({ label, icon: Icon, val, onChange, mono, className, cleaveOptions, ...props }) => (
    <div className={className}>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">{label}</label>
        <div className="relative group">
            {Icon && (
                <Icon className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            )}

            {cleaveOptions ? (
                <Cleave
                    value={val}
                    onChange={onChange}
                    options={cleaveOptions}
                    {...props}
                    className={`w-full py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${Icon ? 'pl-10' : 'px-4'} ${mono ? 'font-mono tracking-wide' : 'font-medium text-slate-700'}`}
                />
            ) : (
                <input
                    value={val}
                    onChange={onChange}
                    {...props}
                    className={`w-full py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${Icon ? 'pl-10' : 'px-4'} ${mono ? 'font-mono tracking-wide' : 'font-medium text-slate-700'}`}
                />
            )}
        </div>
    </div>
);

export const ItemResumen = ({ icono: Icon, label, val, precio, warning }) => (
    <div className={`flex justify-between py-2 border-b border-slate-50 ${!val && 'opacity-50'}`}>
        <div className="flex gap-3">
            <div className="bg-slate-100 p-1.5 rounded text-slate-500"><Icon size={16} /></div>
            <div>
                <span className="text-xs font-bold text-slate-400 block">{label}</span>
                <span className="text-sm font-medium">{val || "—"}</span>
                {warning && <span className="block text-[10px] text-red-500 font-bold">Tarifa descatalogada</span>}
            </div>
        </div>
        <span className="font-semibold text-slate-700">{val ? `${precio} €` : "—"}</span>
    </div>
);

export const BotonAdd = ({ onClick, label }) => (
    <button onClick={onClick} className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl flex justify-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 transition-all"><Plus size={20} /> {label}</button>
);