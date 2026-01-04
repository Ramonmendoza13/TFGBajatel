<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FibraOpcion;


class FibraOpcionController extends Controller
{
    /**
     * @OA\Post(
     *     path="/servicios/fibra",
     *     summary="Añadir opción de fibra",
     *     tags={"Admin - Fibra"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"velocidad","precio"},
     *             @OA\Property(property="velocidad", type="number", example=600),
     *             @OA\Property(property="precio", type="number", example=29.99),
     *             @OA\Property(property="disponible", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Opción añadida"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Requiere rol gestor/admin")
     * )
     */
    public function anadirOpcionFibra(Request $request)
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'velocidad' => 'required|numeric|max:255',
            'precio' => 'required|numeric',
            'disponible' => 'sometimes|required|boolean', // Por defecto true
        ]);

        // Crear una nueva opción de fibra
        $fibraOpcion = new FibraOpcion();
        $fibraOpcion->velocidad = $validatedData['velocidad'];
        $fibraOpcion->precio = $validatedData['precio'];
        if (isset($validatedData['disponible'])) {
            $fibraOpcion->disponible = $validatedData['disponible'];
        }
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
     * @OA\Get(
     *     path="/servicios/fibra/{id}",
     *     summary="Mostrar opción de fibra",
     *     tags={"Admin - Fibra"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Opción encontrada"),
     *     @OA\Response(response=404, description="No encontrada")
     * )
     */
    public function mostrarOpcionFibra($id)
    {
        // Buscar la opción de fibra por ID
        $fibraOpcion = FibraOpcion::find($id);

        // Si no existe, devolver error 404
        if (!$fibraOpcion) {
            return response()->json([
                'mensaje' => 'Opción de fibra no encontrada',
            ], 404);
        }

        // Devolver los datos de la opción de fibra
        return response()->json([
            'mensaje' => 'Opción de fibra encontrada',
            'datos' => $fibraOpcion,
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/servicios/fibra/{id}",
     *     summary="Editar opción de fibra",
     *     tags={"Admin - Fibra"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="velocidad", type="number"),
     *             @OA\Property(property="precio", type="number"),
     *             @OA\Property(property="disponible", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Opción actualizada"),
     *     @OA\Response(response=404, description="No encontrada")
     * )
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
            'velocidad' => 'sometimes|numeric|max:10000',
            'precio' => 'sometimes|numeric',
            'disponible' => 'sometimes|boolean',
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
