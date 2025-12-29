<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Termwind\Components\Li;
use App\Models\LineaMovilContratada;

class MovilesContratadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        if(LineaMovilContratada::count() == 0) {
            if(LineaMovilContratada::where('id_linea', '1')->doesntExist()) {
                $linea1 = new LineaMovilContratada();
                $linea1->numero = '655667788';
                $linea1->id_servicio = 1;
                $linea1->id_movil = 1;
                $linea1->save();
            }
            if(LineaMovilContratada::where('id_linea', '2')->doesntExist()) {
                $linea2 = new LineaMovilContratada();
                $linea2->numero = '611223344';
                $linea2->id_servicio = 2;
                $linea2->id_movil = 2;
                $linea2->save();
            }
        }

    }
}
