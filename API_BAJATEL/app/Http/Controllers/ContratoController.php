<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contrato;
use Illuminate\Support\Facades\Auth;
use App\Models\ContratoServicio;



class ContratoController extends Controller
{
    /**
     * @OA\Post(
     *     path="/contratos/crear",
     *     summary="Crear nuevo contrato",
     *     tags={"Contratos"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"iban","calle_y_n","ciudad","provincia","codigo_postal"},
     *             @OA\Property(property="iban", type="string", minLength=29, maxLength=29, example="ES9121000418450200051332"),
     *             @OA\Property(property="calle_y_n", type="string", example="Calle Mayor 123"),
     *             @OA\Property(property="ciudad", type="string", example="Madrid"),
     *             @OA\Property(property="provincia", type="string", example="Madrid"),
     *             @OA\Property(property="codigo_postal", type="string", example="28001")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Contrato creado"),
     *     @OA\Response(response=400, description="Usuario ya tiene contrato"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function crear(Request $request)
    {
        $usuarioId = $request->user()->id_usuario;

        // Comprobar si el usuario ya tiene un contrato
        $contratoExistente = Contrato::where('id_usuario', $usuarioId)->first();
        if ($contratoExistente) {
            return response()->json([
                'error' => 'El usuario ya tiene un contrato activo.'
            ], 400);
        }

        // Validación de datos
        $datos = $request->validate([
            'iban' => 'required|string|max:29|min:29|unique:contratos,IBAN',
            'calle_y_n' => 'required|string|max:255',
            'ciudad' => 'required|string|max:100',
            'provincia' => 'required|string|max:100',
            'codigo_postal' => 'required|digits:5',
        ]);

        // Crear el contrato
        $contrato = Contrato::create([
            'fecha_alta' => now(),
            'precio_total' => 0,
            'IBAN' => $datos['iban'],
            'calle_y_n' => $datos['calle_y_n'],
            'ciudad' => $datos['ciudad'],
            'provincia' => $datos['provincia'],
            'codigo_postal' => $datos['codigo_postal'],
            'id_usuario' => $usuarioId,
        ]);

        return response()->json([
            'mensaje' => 'Contrato creado correctamente.',
            'contrato' => $contrato,
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/contratos/actualizar",
     *     summary="Actualizar contrato existente",
     *     tags={"Contratos"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="iban", type="string"),
     *             @OA\Property(property="calle_y_n", type="string"),
     *             @OA\Property(property="ciudad", type="string"),
     *             @OA\Property(property="provincia", type="string"),
     *             @OA\Property(property="codigo_postal", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Contrato actualizado"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=404, description="Contrato no encontrado"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function actualizar(Request $request)
    {
        $id_usuario = $request->user()->id_usuario;
        $contrato = Contrato::where('id_usuario', $id_usuario)->first();

        if (!$contrato) {
            return response()->json(['mensaje' => 'Contrato no encontrado.'], 404);
        }

        // Validación de datos
        // IMPORTANTE: Asegúrate de que 'codigo_postal' esté incluido en la validación si se envía
        $datos = $request->validate([
            // Excluir el contrato actual de la comprobación 'unique' para el IBAN
            'iban' => 'sometimes|string|max:34|unique:contratos,IBAN,' . $contrato->id_contrato . ',id_contrato',
            'calle_y_n' => 'sometimes|string|max:255',
            'ciudad' => 'sometimes|string|max:100',
            'provincia' => 'sometimes|string|max:100',
            'codigo_postal' => 'sometimes|digits:5', // FALTABA ESTA VALIDACIÓN o no estaba explícita
        ]);

        $datosAActualizar = [];
        if (isset($datos['iban'])) $datosAActualizar['IBAN'] = $datos['iban'];
        if (isset($datos['calle_y_n'])) $datosAActualizar['calle_y_n'] = $datos['calle_y_n'];
        if (isset($datos['ciudad'])) $datosAActualizar['ciudad'] = $datos['ciudad'];
        if (isset($datos['provincia'])) $datosAActualizar['provincia'] = $datos['provincia'];
        if (isset($datos['codigo_postal'])) $datosAActualizar['codigo_postal'] = $datos['codigo_postal'];

        $contrato->update($datosAActualizar);

        return response()->json([
            'mensaje' => 'Contrato actualizado correctamente.',
            'contrato' => $contrato,
        ], 200);
    }
    /**
     * @OA\Delete(
     *     path="/contratos/cancelar",
     *     summary="Cancelar/eliminar contrato",
     *     tags={"Contratos"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Contrato eliminado"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado"),
     *     @OA\Response(response=404, description="Contrato no encontrado")
     * )
     */
    public function cancelar(Request $request)
    {
        $id_usuario = $request->user()->id_usuario;
        $contrato = Contrato::where('id_usuario', $id_usuario)->first();
        if (!$contrato) {
            return response()->json([
                'mensaje' => 'Contrato no encontrado.',
            ], 404);
        }
        // Verificar que el contrato pertenece al usuario autenticado
        if ($contrato->id_usuario !== $request->user()->id_usuario) {
            return response()->json([
                'mensaje' => 'No autorizado para eliminar este contrato.',
            ], 403);
        }
        $contrato->delete();
        return response()->json([
            'mensaje' => 'Contrato eliminado correctamente.',
        ], 200);
    }
    /**
     * @OA\Get(
     *     path="/contratos/mostrar",
     *     summary="Mostrar contrato del usuario con servicios",
     *     tags={"Contratos"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Contrato con servicios"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado"),
     *     @OA\Response(response=404, description="Contrato no encontrado")
     * )
     */
    public function mostrar(Request $request)
    {
        $id_usuario = $request->user()->id_usuario;
        $contrato = Contrato::where('id_usuario', $id_usuario)->first();
        if (!$contrato) {
            return response()->json([
                'mensaje' => 'Contrato no encontrado.',
            ], 404);
        }
        // Verificar que el contrato pertenece al usuario autenticado
        if ($contrato->id_usuario !== $request->user()->id_usuario) {
            return response()->json([
                'mensaje' => 'No autorizado para eliminar este contrato.',
            ], 403);
        }

        //Obtener servicios asociados al contrato, incluyendo fibra, tv y lineas móviles
        $contratoServicio = ContratoServicio::where('id_contrato', $contrato->id_contrato)
            ->with(['fibra', 'tv', 'lineas.movilOpcion'])
            ->first();

        return response()->json([
            'contrato' => $contrato,
            'servicios' => $contratoServicio, // Falta por mostrar los datos de la linea movil(gb, minutos y precio)
        ], 200);
    }
}
