<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MovilOpcion;

class MovilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        if (MovilOpcion::count() === 0) {
            if(MovilOpcion::where('id_movil', '1')->doesntExist()) {
                $movil = new MovilOpcion();
                $movil->gb_datos = 20;
                $movil->min_llamadas = 120;
                $movil->precio = 10;
                $movil->disponible = true;
                $movil->save();
            }

            if(MovilOpcion::where('id_movil', '2')->doesntExist()) {
                $movil = new MovilOpcion();
                $movil->gb_datos = 100;
                $movil->min_llamadas = -1; // Ilimitadas
                $movil->precio = 15;
                $movil->disponible = true;
                $movil->save();
            }

            if(MovilOpcion::where('id_movil', '3')->doesntExist()) {
                $movil = new MovilOpcion();
                $movil->gb_datos = -1;
                $movil->min_llamadas = -1; // Ilimitadas
                $movil->precio = 20;
                $movil->disponible = true;
                $movil->save();
            }
        }
    }
}
