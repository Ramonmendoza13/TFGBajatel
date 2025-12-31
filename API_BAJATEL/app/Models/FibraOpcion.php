<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FibraOpcion extends Model
{
    use HasFactory;

    protected $table = 'fibra_opciones';
    protected $primaryKey = 'id_fibra';

    protected $fillable = ['velocidad', 'precio', 'disponible'];

    protected $casts = [
        'disponible' => 'boolean',
    ];

    public function contratosServicio()
    {
        return $this->hasMany(ContratoServicio::class, 'id_fibra');
    }

    protected static function booted()
    {
        static::updated(function ($fibra) {
            // Solo actuamos si el precio ha cambiado
            if ($fibra->wasChanged('precio')) {
                $fibra->contratosServicio->load('contrato');
                $contratos = $fibra->contratosServicio->pluck('contrato')->unique('id_contrato');
                foreach ($contratos as $contrato) {
                    if ($contrato) $contrato->actualizarPrecioTotal();
                }
            }
        });
    }
}
