<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

Route::get('/prueba', function () {
    return response()->json([
        'mensaje' => 'CORRECTO',
    ], 200);
});

// Rutas para el controlador UsuarioController
Route::prefix('usuario')->group(function () {
    Route::post('/registro', [UsuarioController::class, 'registro']);
    Route::post('/login', [UsuarioController::class, 'login']);
    Route::middleware('auth:sanctum')->delete('/eliminarCuenta', [UsuarioController::class, 'eliminarCuenta']); // Ruta protegida por token para borrar cuenta
    Route::middleware('auth:sanctum')->post('/logout', [UsuarioController::class, 'logout']);
});

Route::post('/login', [UsuarioController::class, 'login']);
