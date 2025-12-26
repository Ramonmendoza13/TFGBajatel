<?php

namespace Database\Seeders;

use App\Models\FibraOpcion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class FibraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        if (FibraOpcion::count() === 0) {
            if (FibraOpcion::where('id_fibra', '1')->doesntExist()) {
                $fibra = new FibraOpcion();
                $fibra->velocidad = 300;
                $fibra->precio = 29.99;
                $fibra->disponible = true;
                $fibra->save();
            }

            if (FibraOpcion::where('id_fibra', '2')->doesntExist()) {
                $fibra = new FibraOpcion();
                $fibra->velocidad = 1000;
                $fibra->precio = 45;
                $fibra->disponible = true;
                $fibra->save();
            }
        }
    }
}
