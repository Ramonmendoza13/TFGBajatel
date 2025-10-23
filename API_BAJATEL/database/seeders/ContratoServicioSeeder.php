<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContratoServicio;

class ContratoServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear registros de ContratoServicio si no existen
        if (ContratoServicio::count() === 0) {
            if (ContratoServicio::where('id_contrato', '1')->doesntExist()) {
                $contratoServicio = new ContratoServicio();
                $contratoServicio->id_contrato = 1;
                $contratoServicio->id_fibra = 1;
                $contratoServicio->id_tv = 1;
                $contratoServicio->save();
            }
            if (ContratoServicio::where('id_contrato', '2')->doesntExist()) {
                $contratoServicio = new ContratoServicio();
                $contratoServicio->id_contrato = 2;
                $contratoServicio->id_fibra = 2;
                $contratoServicio->id_tv = 2;
                $contratoServicio->save();
            }
        }
    }
}
