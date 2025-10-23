<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovilOpcion extends Model
{
    use HasFactory;

    protected $table = 'movil_opciones';
    protected $primaryKey = 'id_movil';

    protected $fillable = ['gb_datos', 'min_llamadas', 'precio'];

    public function lineas()
    {
        return $this->hasMany(LineaMovilContratada::class, 'id_movil');
    }
}

