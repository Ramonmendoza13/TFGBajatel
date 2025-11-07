<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware genérico para controlar el acceso según el rol del usuario.
 * 
 * Permite usarlo así en las rutas:
 *   ->middleware(['auth:sanctum', 'rol:gestor'])
 *   ->middleware(['auth:sanctum', 'rol:admin,gestor'])
 *
 * ✅ El administrador tiene acceso total a todas las rutas.
 * ✅ Los gestores o usuarios sólo acceden si su rol está en los permitidos.
 */
class RolMiddleware
{
    /**
     * Maneja la solicitud entrante verificando el rol del usuario autenticado.
     *
     * @param  \Illuminate\Http\Request  $request   La petición HTTP actual.
     * @param  \Closure  $next                      La siguiente acción en la cadena.
     * @param  mixed  ...$roles                     Los roles permitidos (pasados como parámetros).
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1️⃣ Obtener el usuario autenticado a través del token Sanctum.
        $usuario = $request->user();

        // 2️⃣ Si no hay usuario logueado (token inválido o expirado), denegar acceso.
        if (!$usuario) {
            return response()->json([
                'mensaje' => 'No autenticado. Token inválido o expirado.'
            ], 401);
        }

        // 3️⃣ Si el usuario es administrador, permitir acceso a cualquier ruta.
        //    Esto evita tener que añadir "admin" en cada middleware de rol.
        if ($usuario->rol === 'admin') {
            return $next($request);
        }

        // 4️⃣ Verificar si el rol del usuario está en la lista de roles permitidos.
        //    Ejemplo: si la ruta usa ->middleware('rol:gestor,usuario')
        //    entonces $roles = ['gestor', 'usuario'].
        if (!in_array($usuario->rol, $roles)) {
            return response()->json([
                'mensaje' => 'Acceso denegado. No tienes permisos suficientes.'
            ], 403);
        }

        // 5️⃣ Si pasa todas las verificaciones, dejar continuar la petición.
        return $next($request);
    }
}
