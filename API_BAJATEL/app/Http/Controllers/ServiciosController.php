<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FibraOpcion;
use App\Models\TVOpcion;
use App\Models\MovilOpcion;

class ServiciosController extends Controller
{
     /**
     * Mostrar todos los servicios disponibles
     */
    public function mostrarServiciosDisponibles()
    {
        $opcionesFibra = FibraOpcion::where('disponible', true)->get();
        $opcionesTV = TVOpcion::where('disponible', true)->get();
        $opcionesMovil = MovilOpcion::where('disponible', true)->get();

        return response()->json([
            'fibra' => $opcionesFibra,
            'tv' => $opcionesTV,
            'movil' => $opcionesMovil,
        ], 200);
    }

    /**
     * Mostrar todos los servicios disponibles y no disponibles (ADMIN)
     */
    public function mostrarTodosServicios()
    {
        $opcionesFibra = FibraOpcion::all();
        $opcionesTV = TVOpcion::all();
        $opcionesMovil = MovilOpcion::all();

        return response()->json([
            'fibra' => $opcionesFibra,
            'tv' => $opcionesTV,
            'movil' => $opcionesMovil,
        ], 200);
    }
}
