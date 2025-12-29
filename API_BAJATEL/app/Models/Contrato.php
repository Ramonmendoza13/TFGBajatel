<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $primaryKey = 'id_contrato';
    protected $fillable = [
        'fecha_alta',
        'precio_total',
        'IBAN',
        'calle_y_n',
        'ciudad',
        'provincia',
        'codigo_postal',
        'id_usuario'
    ];

    public $timestamps = true;

    // Relación con contrato_servicios
    public function servicios()
    {
        return $this->hasMany(ContratoServicio::class, 'id_contrato', 'id_contrato');
    }

    // Método para recalcular el precio total
    public function actualizarPrecioTotal()
    {
        $total = 0;

        // Carga los servicios relacionados con sus subservicios (fibra, tv, lineas)
        $this->loadMissing('servicios.fibra', 'servicios.tv', 'servicios.lineas.movilOpcion');

        foreach ($this->servicios as $servicio) {
            if ($servicio->fibra) {
                $total += $servicio->fibra->precio;
            }
            if ($servicio->tv) {
                $total += $servicio->tv->precio;
            }
            if ($servicio->lineas) {
                foreach ($servicio->lineas as $linea) {
                    if ($linea->movilOpcion) {
                        $total += $linea->movilOpcion->precio;
                    }
                }
            }
        }

        // Guardar el precio actualizado
        $this->precio_total = $total;
        $this->save();
    }
}