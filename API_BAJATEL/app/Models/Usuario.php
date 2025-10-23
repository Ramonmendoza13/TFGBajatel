<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios'; 
    protected $primaryKey = 'id_usuario'; 

    protected $fillable = [
        'nombre',
        'apellidos',
        'dni',
        'email',
        'rol',
        'contraseña'
    ];

    /**
     * Relación con contrato UNO A UNO
     */
    public function contrato()
    {
        return $this->hasOne(Contrato::class, 'id_usuario');
    }
}