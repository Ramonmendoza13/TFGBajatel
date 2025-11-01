<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TvOpcion;

class TvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        if (TvOpcion::count() === 0) {
            if (TvOpcion::where('id_tv', '1')->doesntExist()) {
                $tv = new TvOpcion();
                $tv->nombre_paquete = 'Básico';
                $tv->precio = 5;
                $tv->disponible = true;
                $tv->save();
            }

            if (TvOpcion::where('id_tv', '2')->doesntExist()) {
                $tv = new TvOpcion();
                $tv->nombre_paquete = 'Premium';
                $tv->precio = 11.99;
                $tv->disponible = true;
                $tv->save();
            }
        }
    }
}
