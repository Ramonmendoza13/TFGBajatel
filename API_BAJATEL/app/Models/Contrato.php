<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;

    protected $table = 'contratos';
    protected $primaryKey = 'id_contrato';

    protected $fillable = [
        'fecha_alta',
        'precio_total',
        'IBAN',
        'calle_y_n',
        'ciudad',
        'provincia',
        'id_usuario'
    ];

    /**
     * Relación con usuario UNO A UNO
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    /**
     * Relación con contrato_servicio UNO A MUCHOS
     */
    public function servicio()
    {
        return $this->hasMany(ContratoServicio::class, 'id_contrato');
    }
}
