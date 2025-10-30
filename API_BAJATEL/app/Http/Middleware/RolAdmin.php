<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RolAdmin
{
    /**
     * Verifica que el usuario autenticado sea administrador.
     */
    public function handle(Request $request, Closure $next)
    {
        $usuario = $request->user();

        if (!$usuario || $usuario->rol !== 'admin') {
            return response()->json([
                'mensaje' => 'Acceso denegado. Solo los administradores pueden realizar esta acción.'
            ], 403);
        }

        return $next($request);
    }
}
