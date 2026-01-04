<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FibraOpcion;
use App\Models\TvOpcion;
use App\Models\MovilOpcion;

class ServiciosController extends Controller
{
    /**
     * @OA\Get(
     *     path="/servicios/disponibles",
     *     summary="Listar servicios disponibles (público)",
     *     tags={"Servicios Disponibles"},
     *     @OA\Response(
     *         response=200,
     *         description="Servicios disponibles",
     *         @OA\JsonContent(
     *             @OA\Property(property="fibra", type="array", @OA\Items(type="object")),
     *             @OA\Property(property="tv", type="array", @OA\Items(type="object")),
     *             @OA\Property(property="movil", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
    public function mostrarServiciosDisponibles()
    {
        $opcionesFibra = FibraOpcion::where('disponible', true)->get();
        $opcionesTV = TvOpcion::where('disponible', true)->get();
        $opcionesMovil = MovilOpcion::where('disponible', true)->get();

        return response()->json([
            'fibra' => $opcionesFibra,
            'tv' => $opcionesTV,
            'movil' => $opcionesMovil,
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/servicios/mostrar",
     *     summary="Listar todos los servicios (admin/gestor)",
     *     tags={"Servicios Disponibles"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Todos los servicios"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Requiere rol gestor/admin")
     * )
     */
    public function mostrarTodosServicios()
    {
        $opcionesFibra = FibraOpcion::all();
        $opcionesTV = TvOpcion::all();
        $opcionesMovil = MovilOpcion::all();

        return response()->json([
            'fibra' => $opcionesFibra,
            'tv' => $opcionesTV,
            'movil' => $opcionesMovil,
        ], 200);
    }
}
