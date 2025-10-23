<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UsuariosSeeder;
use Database\Seeders\ContratosSeeder;
use Database\Seeders\ContratoServicioSeeder;
use Database\Seeders\FibraSeeder;
use Database\Seeders\TvSeeder;
use Database\Seeders\MovilSeeder;
use Database\Seeders\MovilesContratadosSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsuariosSeeder::class,           // primero los usuarios
            ContratosSeeder::class,          // después los contratos
            FibraSeeder::class,        // opciones de fibra
            TvSeeder::class,           // opciones de TV
            MovilSeeder::class,        // opciones de móvil
            ContratoServicioSeeder::class,   // luego los servicios
            MovilesContratadosSeeder::class, // finalmente las líneas móviles contratadas
        ]);
    }
}