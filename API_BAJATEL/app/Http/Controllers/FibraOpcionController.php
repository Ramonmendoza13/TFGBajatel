<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FibraOpcion;


class FibraOpcionController extends Controller
{
    public function anadirOpcionFibra(Request $request)
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'velocidad' => 'required|string|max:255',
            'precio' => 'required|numeric',
        ]);

        // Crear una nueva opción de fibra
        $fibraOpcion = new FibraOpcion();
        $fibraOpcion->velocidad = $validatedData['velocidad'];
        $fibraOpcion->precio = $validatedData['precio'];
        $fibraOpcion->save();

        return response()->json([
            'mensaje' => 'Opción de fibra añadida correctamente',
            'datos' => $fibraOpcion,
        ], 201);
    }
    public function eliminarOpcionFibra($id)
    {
        // Buscar la opción de fibra por ID
        $fibraOpcion = FibraOpcion::find($id);

        if (!$fibraOpcion) {
            return response()->json([
                'mensaje' => 'Opción de fibra no encontrada',
            ], 404);
        }

        // Eliminar la opción de fibra
        $fibraOpcion->delete();

        return response()->json([
            'mensaje' => 'Opción de fibra eliminada correctamente',
        ], 200);
    }

    /**
     * 
     */
    public function cambiarDisponibilidadFibra($id)
    {
        // Buscar la opción de fibra por ID
        $fibraOpcion = FibraOpcion::find($id);

        if (!$fibraOpcion) {
            return response()->json([
                'mensaje' => 'Opción de fibra no encontrada',
            ], 404);
        }
        // Cambiar el valor actual al contrario (true ↔ false)
        $fibraOpcion->disponible = !$fibraOpcion->disponible;

        $fibraOpcion->save();

        return response()->json([
            'mensaje' => 'Disponibilidad de fibra cambiada correctamente',
            'datos' => $fibraOpcion,
        ], 201);
    }
}
