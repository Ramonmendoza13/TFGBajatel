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
}
