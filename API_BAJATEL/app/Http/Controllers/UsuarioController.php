<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UsuarioController extends Controller
{
    /**
     * @OA\Post(
     *     path="/usuario/registro",
     *     summary="Registrar nuevo usuario",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","apellidos","dni","email","password"},
     *             @OA\Property(property="nombre", type="string", example="Juan"),
     *             @OA\Property(property="apellidos", type="string", example="García López"),
     *             @OA\Property(property="dni", type="string", minLength=9, maxLength=9, example="12345678A"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", minLength=6, example="password123")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usuario registrado correctamente"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function registro(Request $request)
    {
        try {
            // Validación de datos
            $datos = $request->validate([
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'dni' => 'required|string|min:9|max:9|unique:usuarios,dni',
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

            $token = $usuario->createToken('auth-token')->plainTextToken;

            return response()->json([
                'mensaje' => 'Usuario registrado correctamente. Ya puedes iniciar sesión.',
                'usuario' => $usuario,
                'token' => $token
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
     * @OA\Post(
     *     path="/usuario/login",
     *     summary="Iniciar sesión",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login exitoso - Devuelve token"),
     *     @OA\Response(response=401, description="Credenciales inválidas"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
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
     * @OA\Delete(
     *     path="/usuario/eliminarCuenta",
     *     summary="Eliminar cuenta del usuario autenticado",
     *     tags={"Auth"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Cuenta eliminada correctamente"),
     *     @OA\Response(response=401, description="No autenticado")
     * )
     */
    public function eliminarCuenta(Request $request)
    {
        $usuario = $request->user(); // Obtener el usuario autenticado mediante el token

        $usuario->delete(); // Borrar el usuario de la base de datos

        return response()->json([
            'mensaje' => 'Cuenta de usuario borrada correctamente.',
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/usuario/logout",
     *     summary="Cerrar sesión",
     *     tags={"Auth"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Sesión cerrada correctamente"),
     *     @OA\Response(response=401, description="No autenticado")
     * )
     */
    public function logout(Request $request)
    {
        // Obtener el usuario autenticado mediante el token
        $usuario = $request->user();

        // Revocar todos los tokens del usuario
        $usuario->currentAccessToken()->delete();
        return response()->json([
            'mensaje' => 'Cierre de sesión exitoso.',
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/usuario/editarPerfil",
     *     summary="Editar perfil del usuario",
     *     tags={"Auth"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","passwordActual"},
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="passwordActual", type="string"),
     *             @OA\Property(property="passwordNueva", type="string", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Perfil actualizado"),
     *     @OA\Response(response=401, description="Contraseña actual incorrecta"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function editarPerfil(Request $request)
    {
        $usuario = $request->user(); // Obtener el usuario autenticado mediante el token
        try {
            // Validación de datos
            $datos = $request->validate([
                'email' => 'required|string|email|max:255|unique:usuarios,email,' . $usuario->id_usuario . ',id_usuario',
                'passwordActual' => 'required|string',
                'passwordNueva' => 'nullable|string|min:3',
            ]);

            // Verificar la contraseña actual
            if (!Hash::check($datos['passwordActual'], $usuario->password)) {
                return response()->json([
                    'mensaje' => 'La contraseña actual es incorrecta.',
                ], 401);
            }

            // Actualizar el correo electrónico
            $usuario->email = $datos['email'];

            // Actualizar la contraseña si se proporciona
            if (!empty($datos['passwordNueva'])) {
                $usuario->password = Hash::make($datos['passwordNueva']);
            }

            $usuario->save(); // Guardar los cambios en la base de datos

            return response()->json([
                'mensaje' => 'Perfil actualizado correctamente.',
                'usuario' => $usuario,
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
     * @OA\Get(
     *     path="/usuarios",
     *     summary="Listar todos los usuarios con sus contratos",
     *     tags={"Admin - Usuarios"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Lista de usuarios"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Requiere rol gestor/admin")
     * )
     */
    public function listarUsuariosConContratos()
    {
        $usuarios = Usuario::with([
            'contrato.servicios.fibra',
            'contrato.servicios.tv',
            'contrato.servicios.lineas.movilOpcion',
        ])->get();

        return response()->json($usuarios, 200);
    }


    /**
     * @OA\Put(
     *     path="/usuario/{id}/gestionarRol",
     *     summary="Cambiar rol de usuario (cliente ↔ gestor)",
     *     tags={"Admin - Usuarios"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Rol modificado correctamente"),
     *     @OA\Response(response=400, description="No se puede modificar rol de admin"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Solo admin"),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function gestionarRol($id)
    {
        $usuario = Usuario::find($id); // Buscar el usuario por ID
        if (!$usuario) {
            return response()->json([
                'mensaje' => 'Usuario no encontrado.',
            ], 404);
        }
        if ($usuario->rol === 'cliente') { // Cambiar rol de cliente a gestor
            $usuario->rol = 'gestor';
        } elseif ($usuario->rol === 'gestor') { // Cambiar rol de gestor a cliente
            $usuario->rol = 'cliente';
        } else {
            return response()->json([
                'mensaje' => 'No se puede modificar el rol de un administrador.',
            ], 400);
        }
        $usuario->save(); // Guardar los cambios en la base de datos
        return response()->json([
            'mensaje' => 'Rol de usuario modificado correctamente.',
            'usuario' => $usuario,
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/usuario/{id}",
     *     summary="Eliminar usuario por ID",
     *     tags={"Admin - Usuarios"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Usuario eliminado correctamente"),
     *     @OA\Response(response=400, description="No se puede eliminar admin"),
     *     @OA\Response(response=401, description="No autenticado"),
     *     @OA\Response(response=403, description="No autorizado - Solo admin"),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function eliminarUsuario($id)
    {
        $usuario = Usuario::find($id); // Buscar el usuario por ID
        if (!$usuario) {
            return response()->json([
                'mensaje' => 'Usuario no encontrado.',
            ], 404);
        } else if ($usuario->rol === 'admin') {
            return response()->json([
                'mensaje' => 'No se puede eliminar un usuario administrador.',
            ], 400);
        }
        $usuario->delete(); // Borrar el usuario de la base de datos
        return response()->json([
            'mensaje' => 'Usuario eliminado correctamente.',
        ], 200);
    }
}
