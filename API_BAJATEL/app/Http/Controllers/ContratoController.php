<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contrato;
use Illuminate\Support\Facades\Auth;
use App\Models\ContratoServicio;



class ContratoController extends Controller
{
    /**
     * Crear un nuevo contrato
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
            'iban' => 'required|string|max:34|unique:contratos,IBAN',
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
     * Actualizar un contrato existente
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

        // Mapeo manual para asegurar que los nombres coincidan con la BD
        // Si tu modelo tiene $fillable, esto se hace automático, pero a veces es mejor ser explícito
        $datosAActualizar = [];
        if (isset($datos['iban'])) $datosAActualizar['IBAN'] = $datos['iban']; // Mapeo iban -> IBAN
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
     * Eliminar un contrato
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
     * Mostrar un contrato con todo su detalle(servicios y líneas móviles)
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
