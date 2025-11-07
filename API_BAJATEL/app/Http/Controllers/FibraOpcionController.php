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
     * Editar una opción de fibra existente.
     */
    public function editarOpcionFibra(Request $request, $id)
    {
        // Buscar la opción de fibra por ID
        $fibraOpcion = FibraOpcion::find($id);
        if (!$fibraOpcion) {
            return response()->json([
                'mensaje' => 'Opción de fibra no encontrada',
            ], 404);
        }
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'velocidad' => 'sometimes|required|string|max:255',
            'precio' => 'sometimes|required|numeric',
            'disponible' => 'sometimes|required|boolean',
        ]);
        // Actualizar los campos si están presentes en la solicitud
        if (isset($validatedData['velocidad'])) {
            $fibraOpcion->velocidad = $validatedData['velocidad'];
        }
        if (isset($validatedData['precio'])) {
            $fibraOpcion->precio = $validatedData['precio'];
        }
        if (isset($validatedData['disponible'])) {
            $fibraOpcion->disponible = $validatedData['disponible'];
        }
        $fibraOpcion->save();
        return response()->json([
            'mensaje' => 'Opción de fibra actualizada correctamente',
            'datos' => $fibraOpcion,
        ], 200);
    }
}
