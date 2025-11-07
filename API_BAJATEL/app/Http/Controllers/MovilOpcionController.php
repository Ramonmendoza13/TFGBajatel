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
     * Editar una opcion de Movil existente
     */
    public function editarOpcionMovil(Request $request, $id)
    {
        $movilOpcion = MovilOpcion::find($id);
        if (!$movilOpcion) {
            return response()->json([
                'mensaje' => 'Opción de Móvil no encontrada',
            ], 404);
        }
        $request->validate([
            'gb_datos' => 'sometimes|required|string|max:255',
            'minutos' => 'sometimes|required|numeric|min:0',
            'precio' => 'sometimes|required|numeric|min:0',
            'disponible' => 'sometimes|required|boolean',
        ]);

        if ($request->has('gb_datos')) {
            $movilOpcion->gb_datos = $request->gb_datos;
        }
        if ($request->has('minutos')) {
            $movilOpcion->min_llamadas = $request->minutos;
        }
        if ($request->has('precio')) {
            $movilOpcion->precio = $request->precio;
        }
        if ($request->has('disponible')) {
            $movilOpcion->disponible = $request->disponible;
        }
        $movilOpcion->save();
        return response()->json([
            'mensaje' => 'Opción de Móvil editada correctamente',
            'datos' => $movilOpcion,
        ], 200);
    }
}
