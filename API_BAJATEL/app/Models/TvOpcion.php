<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TvOpcion extends Model
{
    use HasFactory;

    protected $table = 'tv_opciones';
    protected $primaryKey = 'id_tv';

    protected $fillable = ['nombre_paquete', 'precio'];

    public function contratosServicio()
    {
        return $this->hasMany(ContratoServicio::class, 'id_tv');
    }
}

