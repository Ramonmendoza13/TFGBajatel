<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Contrato;
use App\Models\ContratoServicio;
use App\Models\TvOpcion;
use App\Models\MovilOpcion;
use App\Models\FibraOpcion;
use App\Models\LineaMovilContratada;
use Illuminate\Support\Facades\Hash;

class OpcionesServiciosTest extends TestCase
{
    use RefreshDatabase;

    // Test: /servicios/disponibles devuelve estructura
    public function test_mostrar_servicios_disponibles_devuelve_200_y_estructura()
    {
        // Preparar datos: crear una opción disponible de cada tipo
        FibraOpcion::create(['velocidad' => 100, 'precio' => 30, 'disponible' => true]);
        TvOpcion::create(['nombre_paquete' => 'Básico', 'precio' => 10, 'disponible' => true]);
        MovilOpcion::create(['gb_datos' => 5, 'min_llamadas' => 100, 'precio' => 5, 'disponible' => true]);

        $response = $this->getJson('/api/servicios/disponibles');

        $response->assertStatus(200);
        $response->assertJsonStructure(['fibra', 'tv', 'movil']);
        $this->assertNotEmpty($response->json('fibra'));
        $this->assertNotEmpty($response->json('tv'));
        $this->assertNotEmpty($response->json('movil'));
    }

    // Test: crear opción TV válida -> 201
    public function test_crear_opcion_tv_valida_devuelve_201()
    {
        $gestor = Usuario::create(['nombre'=>'G','apellidos'=>'M','dni'=>'10101010A','email'=>'gestor@example.com','rol'=>'gestor','password'=>Hash::make('pass')]);

        $payload = ['nombre_paquete' => 'Premium', 'precio' => 15, 'disponible' => true];

        $response = $this->actingAs($gestor, 'sanctum')->postJson('/api/servicios/tv', $payload);

        $response->assertStatus(201);
        $response->assertJsonStructure(['mensaje', 'datos']);
        $this->assertDatabaseHas('tv_opciones', ['nombre_paquete' => 'Premium']);
    }

    // Test: TV con precio negativo -> 422
    public function test_crear_opcion_tv_precio_negativo_devuelve_422()
    {
        $gestor = Usuario::create(['nombre'=>'G2','apellidos'=>'M','dni'=>'20202020B','email'=>'gestor2@example.com','rol'=>'gestor','password'=>Hash::make('pass')]);

        $payload = ['nombre_paquete' => 'Malo', 'precio' => -5, 'disponible' => true];

        $response = $this->actingAs($gestor, 'sanctum')->postJson('/api/servicios/tv', $payload);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
        $this->assertArrayHasKey('precio', $response->json('errors'));
    }

    // Test: CRUD básico móvil
    public function test_crud_basico_opcion_movil()
    {
        $gestor = Usuario::create(['nombre'=>'GM','apellidos'=>'M','dni'=>'30303030C','email'=>'gestor3@example.com','rol'=>'gestor','password'=>Hash::make('pass')]);

        // Crear
        $payload = ['gb_datos' => 10, 'minutos' => 100, 'disponible' => true, 'precio' => 7.5];
        $resCreate = $this->actingAs($gestor, 'sanctum')->postJson('/api/servicios/movil', $payload);
        $resCreate->assertStatus(201);
        $resCreate->assertJsonStructure(['mensaje', 'datos']);
        $id = $resCreate->json('datos.id_movil');

        // Mostrar
        $resShow = $this->actingAs($gestor, 'sanctum')->getJson("/api/servicios/movil/{$id}");
        $resShow->assertStatus(200);

        // Editar
        $resEdit = $this->actingAs($gestor, 'sanctum')->putJson("/api/servicios/movil/{$id}", ['precio' => 9.99]);
        $resEdit->assertStatus(200);
        $this->assertDatabaseHas('movil_opciones', ['id_movil' => $id, 'precio' => 9.99]);

        // Dado que no se pudo eliminar (ruta no expuesta), el registro sigue existiendo
        $this->assertDatabaseHas('movil_opciones', ['id_movil' => $id]);
    }

    // Test: CRUD básico fibra
    public function test_crud_basico_opcion_fibra()
    {
        $gestor = Usuario::create(['nombre'=>'GF','apellidos'=>'M','dni'=>'40404040D','email'=>'gestor4@example.com','rol'=>'gestor','password'=>Hash::make('pass')]);

        // Crear inválido (velocidad no numérica)
        $resInvalid = $this->actingAs($gestor, 'sanctum')->postJson('/api/servicios/fibra', ['velocidad' => 'rapida', 'precio' => 20]);
        $resInvalid->assertStatus(422);
        $resInvalid->assertJsonStructure(['message', 'errors']);

        // Crear válido
        $resCreate = $this->actingAs($gestor, 'sanctum')->postJson('/api/servicios/fibra', ['velocidad' => 100, 'precio' => 25, 'disponible' => true]);
        $resCreate->assertStatus(201);
        $id = $resCreate->json('datos.id_fibra');

        // Mostrar
        $resShow = $this->actingAs($gestor, 'sanctum')->getJson("/api/servicios/fibra/{$id}");
        $resShow->assertStatus(200);

        // Editar
        $resEdit = $this->actingAs($gestor, 'sanctum')->putJson("/api/servicios/fibra/{$id}", ['precio' => 30]);
        $resEdit->assertStatus(200);
        $this->assertDatabaseHas('fibra_opciones', ['id_fibra' => $id, 'precio' => 30]);

        // Dado que no se pudo eliminar (ruta no expuesta), el registro sigue existiendo
        $this->assertDatabaseHas('fibra_opciones', ['id_fibra' => $id]);
    }

    // Test: contrato servicio y líneas móviles
    public function test_contrato_servicio_lineas_moviles_basicas()
    {
        $usuario = Usuario::create(['nombre'=>'C','apellidos'=>'U','dni'=>'50505050E','email'=>'cliente@example.com','rol'=>'cliente','password'=>Hash::make('pass')]);

        // Crear contrato para el usuario
        $contrato = Contrato::create(['fecha_alta' => now(), 'precio_total' => 0, 'IBAN' => 'ES123','calle_y_n'=>'A','ciudad'=>'X','provincia'=>'Y','codigo_postal'=>'28001','id_usuario'=>$usuario->id_usuario]);

        // Creo fibra para usarla
        $fibra = FibraOpcion::create(['velocidad' => 100, 'precio' => 25, 'disponible' => true]);
        // Añadir servicio fibra usando el id creado
        $resFibra = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/anadirServicioFibra/' . $fibra->id_fibra);
        $resFibra->assertStatus(200);
        $this->assertDatabaseHas('contrato_servicios', ['id_contrato' => $contrato->id_contrato, 'id_fibra' => $fibra->id_fibra]);

        // Creo opción móvil
        $movilOpcion = MovilOpcion::create(['gb_datos' => 5, 'min_llamadas' => 50, 'precio' => 7, 'disponible' => true]);

        // Añadir linea movil con numero inválido (8 dígitos) -> 422
        $resLineaInvalid = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/anadirLineaMovil/' . $movilOpcion->id_movil, ['numero_telefono' => '61234567']);
        $resLineaInvalid->assertStatus(422);
        $resLineaInvalid->assertJsonStructure(['message', 'errors']);

        // Añadir linea movil con numero válido -> 201
        $resLinea = $this->actingAs($usuario, 'sanctum')->postJson('/api/contratos/anadirLineaMovil/' . $movilOpcion->id_movil, ['numero_telefono' => '612345678']);
        $resLinea->assertStatus(201);
        // La tabla real se llama 'lineas_movil_contratadas'
        $this->assertDatabaseHas('lineas_movil_contratadas', ['numero' => '612345678', 'id_movil' => $movilOpcion->id_movil]);

        // Eliminar linea movil con numero formato inválido en ruta -> 400
        $resDelInvalid = $this->actingAs($usuario, 'sanctum')->deleteJson('/api/contratos/eliminarLineaMovil/1234');
        $resDelInvalid->assertStatus(400);
        $resDelInvalid->assertJson(['mensaje' => 'Número inválido.']);
    }

    // Test: actualizar línea no pertenece -> 404
    public function test_actualizar_linea_movil_no_pertenece_devuelve_404()
    {
        $usuario = Usuario::create(['nombre'=>'C2','apellidos'=>'U','dni'=>'60606060F','email'=>'cliente2@example.com','rol'=>'cliente','password'=>Hash::make('pass')]);

        // No hay contrato ni linea
        $res = $this->actingAs($usuario, 'sanctum')->putJson('/api/contratos/actualizarLineaMovil/5', ['numero_telefono' => '612345678']);
        $res->assertStatus(404);
    }
}
