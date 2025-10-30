<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\ContratoServicioController;

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

//Rutas para el controlador ContratoController, todas necesitan autenticación, rutas para clientes
Route::middleware(['auth:sanctum'])->prefix('contratos')->group(function () {
    Route::post('/crear', [ContratoController::class, 'crear']);
    Route::put('/actualizar', [ContratoController::class, 'actualizar']);
    Route::delete('/eliminar', [ContratoController::class, 'eliminar']);
    Route::get('/mostrar', [ContratoController::class, 'mostrar']);
});

//Rutas para el controlador ContratoController, solo para administradores usando el middleware RolAdmin personalizado.
Route::middleware(['auth:sanctum', 'admin'])->prefix('contratos')->group(function () {
    Route::get('/TESTADMIN', function () {
        return response()->json([
            'mensaje' => 'ACCESO ADMIN CORRECTO',
        ], 200);
    });
    // FATAL POR AÑADIR RUTAS ADMINISTRADOR
});

// Ruta para añadir o eliminar servicios a un contrato
Route::middleware(['auth:sanctum'])->prefix('contratos')->group(function () {
    Route::post('/anadirServicioFibra/{id}', [ContratoServicioController::class, 'anadirServicioFibra'])->whereNumber('id');
    Route::post('/anadirServicioTV/{id}', [ContratoServicioController::class, 'anadirServicioTV'])->whereNumber('id');
    Route::delete('/eliminarServicioFibra', [ContratoServicioController::class, 'eliminarServicioFibra']); // Ruta para eliminar servicio de fibra de un contratoServicio
    Route::delete('/eliminarServicioTV', [ContratoServicioController::class, 'eliminarServicioTV']); // Ruta para eliminar servicio de TV de un contrato
    Route::post('/anadirLineaMovil/{id}', [ContratoServicioController::class, 'anadirLineaMovil'])->whereNumber('id');
    Route::delete('/eliminarLineaMovil', [ContratoServicioController::class, 'eliminarLineaMovil']);
});

