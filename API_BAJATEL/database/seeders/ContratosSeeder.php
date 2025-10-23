<?php

namespace Database\Seeders;

use App\Models\Contrato;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;



class ContratosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Contrato::count() === 0) {
            if (Contrato::where('id_contrato', 1)->doesntExist()) {
                $contrato = new Contrato();
                $contrato->fecha_alta = '2024-09-01';
                $contrato->precio_total = 92.00;
                $contrato->IBAN = 'ES00 0000 0000 0000 0001';
                $contrato->calle_y_n = '28 de Febrero nº 10';
                $contrato->ciudad = 'Badolatosa';
                $contrato->provincia = 'Sevilla';
                $contrato->id_usuario = 1;
                $contrato->save();
            }
            if (Contrato::where('id_contrato', 2)->doesntExist()) {
                $contrato = new Contrato();
                $contrato->fecha_alta = '2025-01-10';
                $contrato->precio_total = 29.99;
                $contrato->IBAN = 'ES00 0000 0000 0000 0002';
                $contrato->calle_y_n = 'Avenida Andalucia nº 8';
                $contrato->ciudad = 'Estepa';
                $contrato->provincia = 'Sevilla';
                $contrato->id_usuario = 2;
                $contrato->save();
            }
        }
    }
}
