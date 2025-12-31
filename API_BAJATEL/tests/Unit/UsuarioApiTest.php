<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UsuarioApiTest extends TestCase
{
    use RefreshDatabase;

    #[\PHPUnit\Framework\Attributes\Test]
    public function registro_usuario_con_datos_validos_retorna_201()
    {
        $datos = [
            'nombre' => 'Juan',
            'apellidos' => 'Pérez',
            'dni' => '12345678A',
            'email' => 'juan@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(201);
        $this->assertDatabaseHas('usuarios', [
            'email' => 'juan@example.com',
            'dni' => '12345678A',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function registro_usuario_con_email_invalido_falla()
    {
        $datos = [
            'nombre' => 'Ana',
            'apellidos' => 'García',
            'dni' => '87654321B',
            'email' => 'email_invalido',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(422);
        // Compruebo que los errores vienen en 'errores'
        $response->assertJsonStructure(['mensaje', 'errores']);
        $this->assertArrayHasKey('email', $response->json('errores'));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function registro_usuario_con_password_corta_falla()
    {
        $datos = [
            'nombre' => 'Luis',
            'apellidos' => 'Martínez',
            'dni' => '23456789C',
            'email' => 'luis@example.com',
            'password' => '12',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(422);
        // Compruebo que hay error en 'password'
        $response->assertJsonStructure(['mensaje', 'errores']);
        $this->assertArrayHasKey('password', $response->json('errores'));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function no_se_puede_registrar_dos_usuarios_con_mismo_email()
    {
        // Creo usuario manualmente
        Usuario::create([
            'nombre' => 'Preexistente',
            'apellidos' => 'User',
            'dni' => '12345678A',
            'email' => 'juan@example.com',
            'rol' => 'cliente',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        $datos = [
            'nombre' => 'Pedro',
            'apellidos' => 'Sánchez',
            'dni' => '87654321B',
            'email' => 'juan@example.com', // mismo email
            'password' => 'password456',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(422);
        // Compruebo que los errores vienen en 'errores'
        $response->assertJsonStructure(['mensaje', 'errores']);
        $this->assertArrayHasKey('email', $response->json('errores'));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function login_con_credenciales_validas_retorna_200_y_token()
    {
        // Creo usuario manualmente
        $usuario = Usuario::create([
            'nombre' => 'Laura',
            'apellidos' => 'User',
            'dni' => '99887766L',
            'email' => 'laura@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password123'),
        ]);

        $datos = [
            'email' => 'laura@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/usuario/login', $datos);

        $response->assertStatus(200);
        $response->assertJsonStructure(['mensaje', 'usuario', 'token']);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function login_con_password_incorrecta_falla()
    {
        // Creo usuario manualmente
        $usuario = Usuario::create([
            'nombre' => 'Carlos',
            'apellidos' => 'User',
            'dni' => '55667788C',
            'email' => 'carlos@example.com',
            'rol' => 'cliente',
            'password' => Hash::make('password123'),
        ]);

        $datos = [
            'email' => 'carlos@example.com',
            'password' => 'password_incorrecta',
        ];

        $response = $this->postJson('/api/usuario/login', $datos);

        $response->assertStatus(401);
        $response->assertJson([
            'mensaje' => 'Credenciales inválidas.',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function registro_usuario_con_dni_invalido_falla()
    {
        $datos = [
            'nombre' => 'Juan',
            'apellidos' => 'Pérez',
            'dni' => '1234', // DNI demasiado corto
            'email' => 'juan@example.com',
            'password' => 'secret123',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(422);
        // Compruebo que hay error en 'dni'
        $response->assertJsonStructure(['mensaje', 'errores']);
        $this->assertArrayHasKey('dni', $response->json('errores'));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function registro_usuario_con_dni_existente_falla()
    {
        // Creo usuario previo
        Usuario::create([
            'nombre' => 'Prev',
            'apellidos' => 'User',
            'dni' => '12345678A',
            'email' => 'prev@example.com',
            'rol' => 'cliente',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        $datos = [
            'nombre' => 'Juan',
            'apellidos' => 'Pérez',
            'dni' => '12345678A', // DNI duplicado
            'email' => 'juan2@example.com',
            'password' => 'secret123',
        ];

        $response = $this->postJson('/api/usuario/registro', $datos);

        $response->assertStatus(422);
        // Compruebo que hay error en 'dni'
        $response->assertJsonStructure(['mensaje', 'errores']);
        $this->assertArrayHasKey('dni', $response->json('errores'));
    }
}
