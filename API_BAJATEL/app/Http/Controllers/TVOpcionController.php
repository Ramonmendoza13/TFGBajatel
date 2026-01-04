<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TvOpcion;

class TVOpcionController extends Controller
{
    /**
     * @OA\Post(
     *     path="/servicios/tv",
     *     summary="Añadir opción de TV",
     *     tags={"Admin - TV"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre_paquete","precio","disponible"},
     *             @OA\Property(property="nombre_paquete", type="string", example="Paquete Premium"),
     *             @OA\Property(property="precio", type="number", example=19.99),
     *             @OA\Property(property="disponible", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Opción añadida"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Requiere rol gestor/admin")
     * )
     */
    public function anadirOpcionTV(Request $request)
    {
        $request->validate([
            'nombre_paquete' => 'required|string|max:255',
            'disponible' => 'required|boolean',
            'precio' => 'required|numeric|min:0',
        ]);

        $tvOpcion = new TvOpcion();
        $tvOpcion->nombre_paquete = $request->nombre_paquete;
        $tvOpcion->disponible = $request->disponible;
        $tvOpcion->precio = $request->precio;
        $tvOpcion->save();

        return response()->json([
            'mensaje' => 'Opción de TV añadida correctamente',
            'datos' => $tvOpcion,
        ], 201);
    }
    /**
     * @OA\Get(
     *     path="/servicios/tv/{id}",
     *     summary="Mostrar opción de TV",
     *     tags={"Admin - TV"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Opción encontrada"),
     *     @OA\Response(response=404, description="No encontrada")
     * )
     */
    public function mostrarOpcionTv($id)
    {
        $tvOpcion = TvOpcion::find($id);

        if (!$tvOpcion) {
            return response()->json([
                'mensaje' => 'Opción de TV no encontrada',
            ], 404);
        }

        return response()->json([
            'mensaje' => 'Opción de TV encontrada',
            'datos' => $tvOpcion,
        ], 200);
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
     * @OA\Put(
     *     path="/servicios/tv/{id}",
     *     summary="Editar opción de TV",
     *     tags={"Admin - TV"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre_paquete", type="string"),
     *             @OA\Property(property="precio", type="number"),
     *             @OA\Property(property="disponible", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Opción actualizada"),
     *     @OA\Response(response=404, description="No encontrada")
     * )
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
