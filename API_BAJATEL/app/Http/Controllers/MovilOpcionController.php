<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MovilOpcion;

class MovilOpcionController extends Controller
{
    /**
     * Anadir una nueva opcion de Movil
     */
    public function anadirOpcionMovil(Request $request)
    {
        $request->validate([
            'gb_datos' => 'required|string|max:255',
            'minutos' => 'required|numeric|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        $movilOpcion = new MovilOpcion();
        $movilOpcion->gb_datos = $request->gb_datos;
        $movilOpcion->min_llamadas = $request->minutos;
        $movilOpcion->precio = $request->precio;
        $movilOpcion->save();

        return response()->json([
            'mensaje' => 'Opción de Móvil añadida correctamente',
            'datos' => $movilOpcion,
        ], 201);
    }
    /**
     * Eliminar una opcion de Movil por su ID
     */
    public function eliminarOpcionMovil($id)
    {
        $movilOpcion = MovilOpcion::find($id);

        if (!$movilOpcion) {
            return response()->json([
                'mensaje' => 'Opción de Móvil no encontrada',
            ], 404);
        }

        $movilOpcion->delete();

        return response()->json([
            'mensaje' => 'Opción de Móvil eliminada correctamente',
        ], 200);
    }
    /**
     * Cambiar la disponibilidad de una opcion de Movil
     */
    public function cambiarDisponibilidadMovil($id)
    {
        $movilOpcion = MovilOpcion::find($id);
        if (!$movilOpcion) {
            return response()->json([
                'mensaje' => 'Opción de Móvil no encontrada',
            ], 404);
        }
        // Cambiar el valor actual al contrario (true ↔ false)
        $movilOpcion->disponible = !$movilOpcion->disponible;
        $movilOpcion->save();

        return response()->json([
            'mensaje' => 'Disponibilidad de la opción de Móvil cambiada correctamente',
            'datos' => $movilOpcion,
        ], 200);
    }
}
