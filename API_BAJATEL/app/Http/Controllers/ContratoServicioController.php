<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContratoServicio;
use App\Models\LineaMovilContratada;

class ContratoServicioController extends Controller
{
    /**
     * Añadir o actualizar un servicio de fibra para el contrato del usuario autenticado.
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
     * Añadir o actualizar un servicio de TV para el contrato del usuario autenticado.
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
     * Eliminar el servicio de fibra del contrato del usuario autenticado.
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
     * Añadir o actualizar una línea móvil al contrato del usuario autenticado.
     */
    public function anadirLineaMovil(Request $request, $id_opcion_movil)
    {
        // Validar el número
        $request->validate([
            'numero_telefono' => 'required|string|max:9',
        ]);

        // Encontrar el contrato del usuario autenticado
        $contratoUsuario = $request->user()->contrato;

        if (!$contratoUsuario) {
            return response()->json([
                'mensaje' => 'El usuario no tiene un contrato asociado.',
            ], 404);
        }

        // Obtener el ContratoServicio asociado
        $contratoServicio = ContratoServicio::where('id_contrato', $contratoUsuario->id_contrato)->first();
        if (!$contratoServicio) {
            return response()->json([
                'mensaje' => 'No hay servicios asociados a este contrato.',
            ], 404);
        }

        // Crear o actualizar la línea móvil
        $lineaMovil = LineaMovilContratada::updateOrCreate(
            // Condición para buscar si ya existe esa línea
            ['numero' => $request->input('numero_telefono')],
            // Campos a actualizar o crear
            [
                'id_servicio' => $contratoServicio->id_servicio,
                'id_movil' => $id_opcion_movil,
            ]
        );

        return response()->json([
            'mensaje' => $lineaMovil->wasRecentlyCreated
                ? 'Línea móvil añadida correctamente al contrato ' . $contratoUsuario->id_contrato
                : 'Línea móvil actualizada correctamente en el contrato ' . $contratoUsuario->id_contrato,
        ], 200);
    }
    /**
     * Eliminar una línea móvil del contrato del usuario autenticado.
     */
    public function eliminarLineaMovil(Request $request)
    {
        // Validar el número
        $request->validate([
            'numero_telefono' => 'required|string|max:9',
        ]);

        $telefono = $request->input('numero_telefono'); 
    
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
}