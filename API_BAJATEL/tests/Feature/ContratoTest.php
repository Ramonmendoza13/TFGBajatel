<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Contrato;
use Illuminate\Support\Facades\Hash;

class ContratoTest extends TestCase
{
    use RefreshDatabase;

    // Test: crear contrato válido -> 201
    public function test_crear_contrato_con_datos_validos_devuelve_201()
    {
        // Crear usuario y autenticar con sanctum
        $usuario = Usuario::create([
            'nombre' => 'Test',
            'apellidos' => 'User',
            'dni' => '11111111T',
            'email' => 'test_contrato@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $payload = [
            'iban' => 'ES00 0000 0000 0000 0000 0002',
            'calle_y_n' => 'Calle Falsa 123',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
        ];

        $response = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/crear', $payload);

        $response->assertStatus(201);
        $response->assertJsonStructure(['mensaje', 'contrato']);
        // Verificamos que se inserta el contrato con el IBAN dado
        $this->assertDatabaseHas('contratos', ['IBAN' => $payload['iban']]);
    }

    // Test: crear contrato CP inválido -> 422
    public function test_crear_contrato_con_codigo_postal_invalido_devuelve_422()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test2',
            'apellidos' => 'User',
            'dni' => '22222222U',
            'email' => 'test_contrato2@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $payload = [
            'iban' => 'ES' . str_repeat('2', 20),
            'calle_y_n' => 'Calle Falsa 123',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '2800', // inválido: solo 4 dígitos
        ];

        $response = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/crear', $payload);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
        $this->assertArrayHasKey('codigo_postal', $response->json('errors'));
    }

    // Test: crear contrato sin auth -> 401
    public function test_crear_contrato_sin_autenticacion_devuelve_401()
    {
        $payload = [
            'iban' => 'ES' . str_repeat('3', 20),
            'calle_y_n' => 'Calle Falsa 123',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
        ];

        $response = $this->postJson('/api/contratos/crear', $payload);

        $response->assertStatus(401);
    }

    // Test: actualizar contrato con CP inválido -> 422
    public function test_actualizar_contrato_codigo_postal_invalido_devuelve_422()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test3',
            'apellidos' => 'User',
            'dni' => '33333333R',
            'email' => 'test_contrato3@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        // Crear contrato previo para el usuario
        $contrato = Contrato::create([
            'fecha_alta' => now(),
            'precio_total' => 0,
            'IBAN' => 'ES' . str_repeat('4', 20),
            'calle_y_n' => 'Calle Falsa 5',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
            'id_usuario' => $usuario->id_usuario,
        ]);

        $payload = ['codigo_postal' => '12']; // inválido

        $response = $this->actingAs($usuario, 'sanctum')->putJson('/api/contratos/actualizar', $payload);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
        $this->assertArrayHasKey('codigo_postal', $response->json('errors'));
    }

    // Test: cancelar contrato existente -> 200
    public function test_cancelar_contrato_elimina_y_devuelve_200()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test4',
            'apellidos' => 'User',
            'dni' => '44444444S',
            'email' => 'test_contrato4@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $contrato = Contrato::create([
            'fecha_alta' => now(),
            'precio_total' => 0,
            'IBAN' => 'ES' . str_repeat('5', 20),
            'calle_y_n' => 'Calle Falsa 6',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
            'id_usuario' => $usuario->id_usuario,
        ]);

        $response = $this->actingAs($usuario, 'sanctum')->deleteJson('/api/contratos/cancelar');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('contratos', ['id_contrato' => $contrato->id_contrato]);
    }

    // Test: IBAN demasiado largo -> 422
    public function test_crear_contrato_con_iban_demasiado_largo_devuelve_422()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test5',
            'apellidos' => 'User',
            'dni' => '55555555P',
            'email' => 'test_contrato5@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $payload = [
            // 35 caracteres -> debe fallar por max:34
            'iban' => str_repeat('A', 35),
            'calle_y_n' => 'Calle Falsa 123',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
        ];

        $response = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/crear', $payload);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
        $this->assertArrayHasKey('iban', $response->json('errors'));
    }

    // Test: crear contrato cuando ya existe -> 400
    public function test_crear_contrato_usuario_con_contrato_existente_devuelve_400()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test6',
            'apellidos' => 'User',
            'dni' => '66666666Q',
            'email' => 'test_contrato6@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        // Contrato ya existente
        Contrato::create([
            'fecha_alta' => now(),
            'precio_total' => 0,
            'IBAN' => 'ES' . str_repeat('9', 20),
            'calle_y_n' => 'Calle 1',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
            'id_usuario' => $usuario->id_usuario,
        ]);

        $payload = [
            'iban' => 'ES' . str_repeat('8', 20),
            'calle_y_n' => 'Otra Calle',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
        ];

        $response = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/crear', $payload);

        $response->assertStatus(400);
        // Compruebo mensaje en 'error'
        $response->assertJson(['error' => 'El usuario ya tiene un contrato activo.']);
    }

    // Test: mostrar sin contrato -> 404
    public function test_mostrar_contrato_sin_contrato_devuelve_404()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test7',
            'apellidos' => 'User',
            'dni' => '77777777R',
            'email' => 'test_contrato7@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $response = $this->actingAs($usuario, 'sanctum')->getJson('/api/contratos/mostrar');

        $response->assertStatus(404);
        $response->assertJson(['mensaje' => 'Contrato no encontrado.']);
    }

    // Test: actualizar contrato válido -> 200
    public function test_actualizar_contrato_con_datos_validos_devuelve_200()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test8',
            'apellidos' => 'User',
            'dni' => '88888888S',
            'email' => 'test_contrato8@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $contrato = Contrato::create([
            'fecha_alta' => now(),
            'precio_total' => 0,
            'IBAN' => 'ES' . str_repeat('7', 20),
            'calle_y_n' => 'Calle Antigua 4',
            'ciudad' => 'Madrid',
            'provincia' => 'Madrid',
            'codigo_postal' => '28001',
            'id_usuario' => $usuario->id_usuario,
        ]);

        $payload = ['calle_y_n' => 'Calle Nueva 99'];

        $response = $this->actingAs($usuario, 'sanctum')->putJson('/api/contratos/actualizar', $payload);

        $response->assertStatus(200);
        $response->assertJsonStructure(['mensaje', 'contrato']);
        $this->assertDatabaseHas('contratos', ['calle_y_n' => 'Calle Nueva 99']);
    }

    // Test: cancelar sin contrato -> 404
    public function test_cancelar_contrato_sin_contrato_devuelve_404()
    {
        $usuario = Usuario::create([
            'nombre' => 'Test9',
            'apellidos' => 'User',
            'dni' => '99999999T',
            'email' => 'test_contrato9@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password'),
        ]);

        $response = $this->actingAs($usuario, 'sanctum')->deleteJson('/api/contratos/cancelar');

        $response->assertStatus(404);
        $response->assertJson(['mensaje' => 'Contrato no encontrado.']);
    }
}
