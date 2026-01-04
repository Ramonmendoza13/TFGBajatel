<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContratoServicio;
use App\Models\LineaMovilContratada;

class ContratoServicioController extends Controller
{
    /**
     * @OA\Post(
     *     path="/contratos/anadirServicioFibra/{id}",
     *     summary="Añadir/actualizar servicio de fibra al contrato",
     *     tags={"Servicios Contrato"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la opción de fibra", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Servicio añadido/actualizado"),
     *     @OA\Response(response=404, description="Usuario sin contrato")
     * )
     */
    public function anadirServicioFibra(Request $request, $id_fibra)
    {
        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;

        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }

        // Si no existe ningun servicio para ese contrato, crear uno nuevo
        if (ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->doesntExist()) {
            $contratoServicio = new ContratoServicio();
            $contratoServicio->id_contrato = $contratoUsuario->id_contrato;
            $contratoServicio->id_fibra = $id_fibra;
            $contratoServicio->save();
        } else {
            // Si existe un servicio para ese contrato, actualizarlo
            $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
            $contratoServicio->id_fibra = $id_fibra;
            $contratoServicio->save();
        }

        //devolver el id del contrato del usuario autenticado
        return response()->json([
            'mensaje' => 'Servicio de fibra añadido/actualizado correctamente para el contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/contratos/anadirServicioTV/{id}",
     *     summary="Añadir/actualizar servicio de TV al contrato",
     *     tags={"Servicios Contrato"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la opción de TV", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Servicio añadido/actualizado"),
     *     @OA\Response(response=404, description="Usuario sin contrato")
     * )
     */
    public function anadirServicioTV(Request $request, $id_tv)
    {
        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;

        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }

        // Si no existe ningun servicio para ese contrato, crear uno nuevo
        if (ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->doesntExist()) {
            $contratoServicio = new ContratoServicio();
            $contratoServicio->id_contrato = $contratoUsuario->id_contrato;
            $contratoServicio->id_tv = $id_tv;
            $contratoServicio->save();
        } else {
            // Si existe un servicio para ese contrato, actualizarlo
            $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
            $contratoServicio->id_tv = $id_tv;
            $contratoServicio->save();
        }

        //devolver el id del contrato del usuario autenticado
        return response()->json([
            'mensaje' => 'Servicio de TV añadido/actualizado correctamente para el contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }

    // AÑADIR LOS METODOS PARA ELIMINAR SERVICIOS DE FIBRA Y TV
    /**
     * @OA\Delete(
     *     path="/contratos/eliminarServicioFibra",
     *     summary="Eliminar servicio de fibra del contrato",
     *     tags={"Servicios Contrato"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Servicio eliminado"),
     *     @OA\Response(response=404, description="Sin servicio de fibra")
     * )
     */
    public function eliminarServicioFibra(Request $request)
    {
        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;
        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }
        // Obtener el ContratoServicio asociado al contrato del usuario
        $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
        if (!$contratoServicio || !$contratoServicio->id_fibra) {
            return response()->json([
                'mensaje' => 'No hay servicio de fibra asociado a este contrato.',
            ], 404);
        }
        // Eliminar el servicio de fibra
        $contratoServicio->id_fibra = null;
        $contratoServicio->save();
        return response()->json([
            'mensaje' => 'Servicio de fibra eliminado correctamente del contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }

    /**
     * Eliminar el servicio de TV del contrato del usuario autenticado.
     */
    public function eliminarServicioTV(Request $request)
    {
        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;
        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }
        // Obtener el ContratoServicio asociado al contrato del usuario
        $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
        if (!$contratoServicio || !$contratoServicio->id_tv) {
            return response()->json([
                'mensaje' => 'No hay servicio de TV asociado a este contrato.',
            ], 404);
        }
        // Eliminar el servicio de TV   
        $contratoServicio->id_tv = null;
        $contratoServicio->save();
        return response()->json([
            'mensaje' => 'Servicio de TV eliminado correctamente del contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }
    /**
     * @OA\Post(
     *     path="/contratos/anadirLineaMovil/{id}",
     *     summary="Añadir línea móvil al contrato",
     *     tags={"Servicios Contrato"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la opción móvil", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="numero_telefono", type="string", nullable=true, example="612345678")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Línea añadida"),
     *     @OA\Response(response=404, description="Usuario sin contrato")
     * )
     */
    public function anadirLineaMovil(Request $request, $id_opcion_movil)
    {
        // 1️⃣ Validación (el número es opcional)
        $request->validate([
            'numero_telefono' => 'nullable|string|size:9',
        ]);

        // 2️⃣ Obtener contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;

        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }

        // 3️⃣ Obtener el servicio asociado al contrato
        $contratoServicio = ContratoServicio::where(
            'id_contrato',
            $contratoUsuario->id_contrato
        )->first();

        if (!$contratoServicio) {
            return response()->json([
                'mensaje' => 'No hay servicios asociados a este contrato.',
            ], 404);
        }

        // 4️⃣ Obtener o generar número de teléfono
        $numero = $request->input('numero_telefono');

        if (!$numero) {
            do {
                // Móvil español (empieza por 6)
                $numero = '6' . random_int(10000000, 99999999);
            } while (
                LineaMovilContratada::where('numero', $numero)->exists()
            );
        }

        // 5️⃣ Crear la línea móvil (siempre nueva)
        $lineaMovil = LineaMovilContratada::create([
            'numero' => $numero,
            'id_servicio' => $contratoServicio->id_servicio,
            'id_movil' => $id_opcion_movil,
        ]);

        // 6️⃣ Respuesta
        return response()->json([
            'mensaje' => 'Línea móvil añadida correctamente al contrato ' . $contratoUsuario->id_contrato,
            'numero_generado' => $numero,
        ], 201);
    }
    /**
     * @OA\Delete(
     *     path="/contratos/eliminarLineaMovil/{numero}",
     *     summary="Eliminar línea móvil del contrato",
     *     tags={"Servicios Contrato"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="numero", in="path", required=true, description="Número de teléfono", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Línea eliminada"),
     *     @OA\Response(response=404, description="Línea no encontrada")
     * )
     */
    public function eliminarLineaMovil(Request $request, $numero)
    {
        // Validar el número (viene por parámetro de ruta)
        if (!preg_match('/^\d{9}$/', $numero)) {
            return response()->json(['mensaje' => 'Número inválido.'], 400);
        }

        $telefono = $numero;

        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;
        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }
        // Obtener el ContratoServicio asociado al contrato del usuario
        $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
        if (!$contratoServicio) {
            return response()->json([
                'mensaje' => 'No hay servicios asociados a este contrato.',
            ], 404);
        }

        // Eliminar la línea móvil
        $lineaMovil = LineaMovilContratada::where('numero', $telefono)
            ->where('id_servicio', $contratoServicio->id_servicio)
            ->first();

        if (!$lineaMovil) {
            return response()->json([
                'mensaje' => 'No hay línea móvil asociada a este contrato.',
            ], 404);
        }

        $lineaMovil->delete();

        return response()->json([
            'mensaje' => 'Línea móvil eliminada correctamente del contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }

    /**
     * Actualizar la tarifa de una línea móvil existente.
     * Recibe el ID de la nueva tarifa en la URL y el número de teléfono en el body.
     */
    public function actualizarLineaMovil(Request $request, $id_nueva_tarifa)
    {
        // 1. Validamos que nos envíen el número que queremos modificar
        $request->validate([
            'numero_telefono' => 'required|string|size:9',
        ]);

        $telefono = $request->input('numero_telefono');
        $contratoUsuario = $request->user()->contrato;

        if (!$contratoUsuario) {
            return response()->json(['mensaje' => 'Sin contrato.'], 404);
        }

        // 2. Buscamos el servicio general del contrato (para asegurarnos que la línea es de este contrato)
        $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();

        if (!$contratoServicio) {
            return response()->json(['mensaje' => 'Error de integridad en contrato.'], 404);
        }

        // 3. Buscamos la línea específica por su número Y que pertenezca al servicio del usuario
        $linea = LineaMovilContratada::where('numero', $telefono)
            ->where('id_servicio', $contratoServicio->id_servicio)
            ->first();

        if (!$linea) {
            return response()->json(['mensaje' => 'La línea ' . $telefono . ' no pertenece a tu contrato.'], 404);
        }

        // 4. Actualizamos la tarifa
        $linea->id_movil = $id_nueva_tarifa;
        $linea->save();

        return response()->json([
            'mensaje' => 'Tarifa actualizada correctamente para la línea ' . $telefono
        ], 200);
    }
}
