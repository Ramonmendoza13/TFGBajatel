<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\ContratoServicioController;
use App\Http\Controllers\FibraOpcionController;
use App\Http\Controllers\TVOpcionController;
use App\Http\Controllers\MovilOpcionController;
use App\Http\Controllers\ServiciosController;

/*
|--------------------------------------------------------------------------
| API Routes - Bajatel
|--------------------------------------------------------------------------
| Rutas y tipo de acceso:
| Públicas (sin autenticación)
| Usuario autenticado
| Administrador (con middleware 'admin')
|--------------------------------------------------------------------------
*/

//Ruta de prueba para verificar que la API funciona
Route::get('/prueba', fn() => response()->json(['mensaje' => 'CORRECTO'], 200));

/*
* RUTAS PÚBLICAS
*/
Route::prefix('usuario')->group(function () {
    Route::post('/registro', [UsuarioController::class, 'registro']);
    Route::post('/login', [UsuarioController::class, 'login']);
});

// Servicios visibles para todos 
Route::get('/servicios/disponibles', [ServiciosController::class, 'mostrarServiciosDisponibles']);

/*
* RUTAS PARA USUARIOS AUTENTICADOS
*/
Route::middleware(['auth:sanctum'])->group(function () {

    //Usuario autenticado
    Route::prefix('usuario')->group(function () {
        Route::post('/logout', [UsuarioController::class, 'logout']);
        Route::delete('/eliminarCuenta', [UsuarioController::class, 'eliminarCuenta']);
    });

    //Contratos (propios del usuario)
    Route::prefix('contratos')->group(function () {
        Route::post('/crear', [ContratoController::class, 'crear']);
        Route::put('/actualizar', [ContratoController::class, 'actualizar']);
        Route::delete('/eliminar', [ContratoController::class, 'eliminar']);
        Route::get('/mostrar', [ContratoController::class, 'mostrar']);

        // Servicios asociados a contratos
        Route::post('/anadirServicioFibra/{id}', [ContratoServicioController::class, 'anadirServicioFibra'])->whereNumber('id');
        Route::post('/anadirServicioTV/{id}', [ContratoServicioController::class, 'anadirServicioTV'])->whereNumber('id');
        Route::post('/anadirLineaMovil/{id}', [ContratoServicioController::class, 'anadirLineaMovil'])->whereNumber('id');

        Route::delete('/eliminarServicioFibra', [ContratoServicioController::class, 'eliminarServicioFibra']);
        Route::delete('/eliminarServicioTV', [ContratoServicioController::class, 'eliminarServicioTV']);
        Route::delete('/eliminarLineaMovil', [ContratoServicioController::class, 'eliminarLineaMovil']);
    });
});

/*
* RUTAS SOLO PARA ADMINISTRADORES
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // Prueba de acceso admin
    Route::get('/test', fn() => response()->json(['mensaje' => 'ACCESO ADMIN CORRECTO'], 200));

    // Gestión de servicios
    Route::prefix('servicios')->group(function () {
        // Fibra
        Route::post('/fibra', [FibraOpcionController::class, 'anadirOpcionFibra']);
        Route::put('/fibra/{id}/disponibilidad', [FibraOpcionController::class, 'cambiarDisponibilidadFibra'])->whereNumber('id');

        // TV
        Route::post('/tv', [TVOpcionController::class, 'anadirOpcionTV']);
        Route::put('/tv/{id}/disponibilidad', [TVOpcionController::class, 'cambiarDisponibilidadTV'])->whereNumber('id');

        // Móvil
        Route::post('/movil', [MovilOpcionController::class, 'anadirOpcionMovil']);
        Route::put('/movil/{id}/disponibilidad', [MovilOpcionController::class, 'cambiarDisponibilidadMovil'])->whereNumber('id');

        // Mostrar todo (sin filtrar por disponibilidad)
        Route::get('/mostrar', [ServiciosController::class, 'mostrarTodosServicios']);
    });

    // AÑADIR Gestión de usuarios
});
