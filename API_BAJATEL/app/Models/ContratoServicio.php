<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContratoServicio extends Model
{
    use HasFactory;

    protected $table = 'contrato_servicios';
    protected $primaryKey = 'id_servicio';

    protected $fillable = ['id_contrato', 'id_fibra', 'id_tv'];

    public function contrato()
    {
        return $this->belongsTo(Contrato::class, 'id_contrato');
    }

    public function fibra()
    {
        return $this->belongsTo(FibraOpcion::class, 'id_fibra');
    }

    public function tv()
    {
        return $this->belongsTo(TvOpcion::class, 'id_tv');
    }

    public function lineas()
    {
        return $this->hasMany(LineaMovilContratada::class, 'id_servicio');
    }

    /**
     * Metodo boot para escuchar eventos de creación, actualización y eliminación y actualizar el precio total del contrato relacionado cada vez que un ContratoServicio cambia.
     */
    public static function boot()
    {
        parent::boot();

        static::created(function ($contratoServicio) {
            $contratoServicio->contrato->actualizarPrecioTotal();
        });

        static::updated(function ($contratoServicio) {
            $contratoServicio->contrato->actualizarPrecioTotal();
        });

        static::deleted(function ($contratoServicio) {
            $contratoServicio->contrato->actualizarPrecioTotal();
        });
    }
}
