<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="API Bajatel - Proyecto DAW",
 *     description="API REST para gestión de contratos de telecomunicaciones (Fibra, TV, Móvil)",
 *     @OA\Contact(email="soporte@bajatel.com")
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Servidor de desarrollo"
 * )
 * 
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Laravel Sanctum - Usar: Bearer {token}"
 * )
 * 
 * @OA\Tag(name="Auth", description="Autenticación y gestión de usuarios")
 * @OA\Tag(name="Contratos", description="Gestión de contratos")
 * @OA\Tag(name="Servicios Contrato", description="Añadir/eliminar servicios a contratos")
 * @OA\Tag(name="Servicios Disponibles", description="Consultar servicios disponibles")
 * @OA\Tag(name="Admin - Fibra", description="Gestión de opciones de fibra (Admin/Gestor)")
 * @OA\Tag(name="Admin - TV", description="Gestión de opciones de TV (Admin/Gestor)")
 * @OA\Tag(name="Admin - Móvil", description="Gestión de opciones móviles (Admin/Gestor)")
 * @OA\Tag(name="Admin - Usuarios", description="Gestión de usuarios (Admin)")
 */
abstract class Controller
{
    //
}
