<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TvOpcion;

class TVOpcionController extends Controller
{
    /**
     * Anadir una nueva opcion de TV
     */
    public function anadirOpcionTV(Request $request)
    {
        $request->validate([
            'nombre_paquete' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        $tvOpcion = new TvOpcion();
        $tvOpcion->nombre_paquete = $request->nombre_paquete;
        $tvOpcion->precio = $request->precio;
        $tvOpcion->save();

        return response()->json([
            'mensaje' => 'Opción de TV añadida correctamente',
            'datos' => $tvOpcion,
        ], 201);
    }
    /**
     * Eliminar una opcion de TV por su ID
     */
    public function eliminarOpcionTV($id)
    {
        $tvOpcion = TvOpcion::find($id);

        if (!$tvOpcion) {
            return response()->json([
                'mensaje' => 'Opción de TV no encontrada',
            ], 404);
        }

        $tvOpcion->delete();

        return response()->json([
            'mensaje' => 'Opción de TV eliminada correctamente',
        ], 200);
    }
    /**
     * Cambiar la disponibilidad de una opcion de TV
     */
    public function cambiarDisponibilidadTV($id)
    {
        $tvOpcion = TvOpcion::find($id);

        if (!$tvOpcion) {
            return response()->json([
                'mensaje' => 'Opción de TV no encontrada',
            ], 404);
        }
        // Cambiar el valor actual al contrario (true ↔ false)
        $tvOpcion->disponible = !$tvOpcion->disponible;

        $tvOpcion->save();

        return response()->json([
            'mensaje' => 'Disponibilidad de la opción de TV cambiada correctamente',
            'datos' => $tvOpcion,
        ], 200);
    }
}
