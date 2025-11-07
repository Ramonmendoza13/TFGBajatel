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
     * Editar una opcion de TV existente
     */
    public function editarOpcionTV(Request $request, $id)
    {
        $tvOpcion = TvOpcion::find($id);
        if (!$tvOpcion) {
            return response()->json([
                'mensaje' => 'Opción de TV no encontrada',
            ], 404);
        }
        $request->validate([
            'nombre_paquete' => 'sometimes|required|string|max:255',
            'precio' => 'sometimes|required|numeric|min:0',
            'disponible' => 'sometimes|required|boolean',
        ]);

        if ($request->has('nombre_paquete')) {
            $tvOpcion->nombre_paquete = $request->nombre_paquete;
        }
        if ($request->has('precio')) {
            $tvOpcion->precio = $request->precio;
        }
        if ($request->has('disponible')) {
            $tvOpcion->disponible = $request->disponible;
        }
        $tvOpcion->save();
        return response()->json([
            'mensaje' => 'Opción de TV editada correctamente',
            'datos' => $tvOpcion,
        ], 200);
    }
}
