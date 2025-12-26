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
            'gb_datos' => 'required|numeric|max:255',  // -1 para ilimitados
            'minutos' => 'required|numeric|', // -1 para ilimitadas
            'disponible' => 'required|boolean',
            'precio' => 'required|numeric|min:0',
        ]);

        $movilOpcion = new MovilOpcion();
        $movilOpcion->gb_datos = $request->gb_datos;
        $movilOpcion->min_llamadas = $request->minutos;
        $movilOpcion->disponible = $request->disponible;
        $movilOpcion->precio = $request->precio;
        $movilOpcion->save();

        return response()->json([
            'mensaje' => 'Opción de Móvil añadida correctamente',
            'datos' => $movilOpcion,
        ], 201);
    }
    /**
     * Mostrar los datos de una opción de móvil existente.
     */
    public function mostrarOpcionMovil($id)
    {
        // Buscar la opción de móvil por ID
        $movilOpcion = MovilOpcion::find($id);

        // Si no existe, devolver error 404
        if (!$movilOpcion) {
            return response()->json([
                'mensaje' => 'Opción de móvil no encontrada',
            ], 404);
        }

        // Devolver los datos de la opción de móvil
        return response()->json([
            'mensaje' => 'Opción de móvil encontrada',
            'datos' => $movilOpcion,
        ], 200);
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
            'gb_datos' => 'sometimes|required|numeric|max:255',
            'minutos' => 'sometimes|required|numeric',
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
