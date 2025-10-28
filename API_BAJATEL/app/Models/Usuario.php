<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'usuarios'; 
    protected $primaryKey = 'id_usuario'; 

    protected $fillable = [
        'nombre',
        'apellidos',
        'dni',
        'email',
        'rol',
        'password'
    ];

    /**
     * Relación con contrato UNO A UNO
     */
    public function contrato()
    {
        return $this->hasOne(Contrato::class, 'id_usuario');
    }
}