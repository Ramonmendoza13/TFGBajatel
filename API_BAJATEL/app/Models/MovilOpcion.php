<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovilOpcion extends Model
{
    use HasFactory;

    protected $table = 'movil_opciones';
    protected $primaryKey = 'id_movil';

    protected $fillable = ['gb_datos', 'min_llamadas', 'precio', 'disponible'];

    protected $casts = [
        'disponible' => 'boolean',
    ];

    public function lineas()
    {
        return $this->hasMany(LineaMovilContratada::class, 'id_movil');
    }

    protected static function booted()
    {
        static::updated(function ($movil) {
            // Solo actuamos si el precio ha cambiado
            if ($movil->wasChanged('precio')) {
                $movil->lineas->load('servicio.contrato');
                $contratos = $movil->lineas->map(function ($l) {
                    return $l->servicio->contrato ?? null;
                })->filter()->unique('id_contrato');

                foreach ($contratos as $contrato) {
                    if ($contrato) $contrato->actualizarPrecioTotal();
                }
            }
        });
    }
}

