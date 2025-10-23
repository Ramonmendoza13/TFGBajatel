<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineaMovilContratada extends Model
{
    use HasFactory;

    protected $table = 'lineas_movil_contratadas';
    protected $primaryKey = 'id_linea';

    protected $fillable = ['numero', 'id_servicio', 'id_movil'];

    public function servicio()
    {
        return $this->belongsTo(ContratoServicio::class, 'id_servicio');
    }

    public function opcionMovil()
    {
        return $this->belongsTo(MovilOpcion::class, 'id_movil');
    }
}

