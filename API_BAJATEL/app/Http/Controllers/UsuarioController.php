<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UsuarioController extends Controller
{
    /**
     * Registrar un nuevo usuario
     */
    public function registro(Request $request)
    {
        try {
            // Validación de datos
            $datos = $request->validate([
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'dni' => 'required|string|max:20|unique:usuarios,dni',
                'email' => 'required|string|email|max:255|unique:usuarios,email',
                'password' => 'required|string|min:6',
            ]);

            // Creamos el usuario en la base de datos
            $usuario = Usuario::create([
                'nombre' => $datos['nombre'],
                'apellidos' => $datos['apellidos'],
                'dni' => $datos['dni'],
                'email' => $datos['email'],
                'rol' => 'cliente', // Rol por defecto
                'password' => Hash::make($datos['password']), // Hasheamos la contraseña
            ]);

            return response()->json([
                'mensaje' => 'Usuario registrado correctamente. Ya puedes iniciar sesión.',
                'usuario' => $usuario,
            ], 201);
        } catch (ValidationException $e) {
            // Error de validación
            return response()->json([
                'mensaje' => 'Error de validación',
                'errores' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Error  del servidor
            return response()->json([
                'mensaje' => 'Error en el servidor',
                'error' => config('app.debug') ? $e->getMessage() : 'Ocurrió un error inesperado.',
            ], 500);
        }
    }

    /**
     * Iniciar sesión de un usuario
     */
    public function login(Request $request)
    {
        try {
            // Validación de datos
            $datos = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            // Buscar el usuario por email
            $usuario = Usuario::where('email', $datos['email'])->first();

            // Verificar credenciales
            if (!$usuario || !Hash::check($datos['password'], $usuario->password)) {
                return response()->json([
                    'mensaje' => 'Credenciales inválidas.',
                ], 401);
            }

            $token = $usuario->createToken('auth-token')->plainTextToken;

            return response()->json([
                'mensaje' => 'Inicio de sesión exitoso.',
                'usuario' => $usuario,
                'token' => $token,
            ], 200);
        } catch (ValidationException $e) {
            // Error de validación
            return response()->json([
                'mensaje' => 'Error de validación',
                'errores' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Error del servidor
            return response()->json([
                'mensaje' => 'Error en el servidor',
                'error' => config('app.debug') ? $e->getMessage() : 'Ocurrió un error inesperado.',
            ], 500);
        }
    }

    /**
     * Borrar la cuenta de un usuario autenticado
     */
    public function eliminarCuenta(Request $request)
    {
        try {
            $usuario = $request->user(); // Obtener el usuario autenticado mediante el token

            if (!$usuario) {
                return response()->json([
                    'mensaje' => 'Usuario no autenticado.',
                ], 401);
            }

            $usuario->delete(); // Borrar el usuario de la base de datos

            return response()->json([
                'mensaje' => 'Cuenta de usuario borrada correctamente.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error en el servidor',
                'error' => config('app.debug') ? $e->getMessage() : 'Ocurrió un error inesperado.',
            ], 500);
        }
    }

    /**
     * Cerrar sesión del usuario autenticado
     */
    public function logout(Request $request)
    {
        try {
            // Obtener el usuario autenticado mediante el token
            $usuario = $request->user();
            if (!$usuario) {
                return response()->json([
                    'mensaje' => 'Usuario no autenticado.',
                ], 401);
            }
            // Revocar todos los tokens del usuario
            $usuario->currentAccessToken()->delete();
            return response()->json([
                'mensaje' => 'Cierre de sesión exitoso.',
            ], 200);
        } catch (\Exception $e) {
            // Error del servidor
            return response()->json([
                'mensaje' => 'Error en el servidor',
                'error' => config('app.debug') ? $e->getMessage() : 'Ocurrió un error inesperado.',
            ], 500);
        }
    }
}
