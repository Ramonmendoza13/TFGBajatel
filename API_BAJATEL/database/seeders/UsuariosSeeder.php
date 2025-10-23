<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Solo insertamos si la tabla está vacía
        if (Usuario::count() === 0) {
            if (Usuario::where('email', 'laura@gmail.com')->doesntExist()) {
                $usuario = new Usuario();
                $usuario->nombre = 'Laura';
                $usuario->apellidos = 'García Pozo';
                $usuario->dni = '11112222C';
                $usuario->email = 'laura@gmail.com';
                $usuario->rol = 'usuario';
                $usuario->contraseña =  Hash::make('LGP1');
                $usuario->save();
            }

            if (Usuario::where('email', 'paco@gmail.com')->doesntExist()) {
                $usuario = new Usuario();
                $usuario->nombre = 'PACO';
                $usuario->apellidos = 'Soto Castro';
                $usuario->dni = '55667788B';
                $usuario->email = 'paco@gmail.com';
                $usuario->rol = 'usuario';
                $usuario->contraseña =  Hash::make('PSC1');
                $usuario->save();
            }

            if (Usuario::where('email', 'ramon@gmail.com')->doesntExist()) {
                $usuario = new Usuario();
                $usuario->nombre = 'Ramon';
                $usuario->apellidos = 'Mendoza Candelario';
                $usuario->dni = '12345678S';
                $usuario->email = 'rmc1@email.com';
                $usuario->rol = 'admin';
                $usuario->contraseña =  Hash::make('RMC1');
                $usuario->save();
            }

            if (Usuario::where('email', 'fad@gmail.com')->doesntExist()) {
                $usuario = new Usuario();
                $usuario->nombre = 'Fernando';
                $usuario->apellidos = 'Alonso Diaz';
                $usuario->dni = '333333333A';
                $usuario->email = 'fad@gmail.com';
                $usuario->rol = 'gestor';
                $usuario->contraseña = Hash::make('FAD1');
                $usuario->save();
            }
        }
    }
}
