<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TvOpcion extends Model
{
    use HasFactory;

    protected $table = 'tv_opciones';
    protected $primaryKey = 'id_tv';

    protected $fillable = ['nombre_paquete', 'precio', 'disponible'];

    protected $casts = [
        'disponible' => 'boolean',
    ];

    public function contratosServicio()
    {
        return $this->hasMany(ContratoServicio::class, 'id_tv');
    }

    protected static function booted()
    {
        static::updated(function ($tv) {
            // Solo actuamos si el precio ha cambiado
            if ($tv->wasChanged('precio')) {
                $tv->contratosServicio->load('contrato');
                $contratos = $tv->contratosServicio->pluck('contrato')->unique('id_contrato');
                foreach ($contratos as $contrato) {
                    if ($contrato) $contrato->actualizarPrecioTotal();
                }
            }
        });
    }
}