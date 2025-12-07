<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->increments('id_contrato'); // AUTO_INCREMENT
            $table->date('fecha_alta');
            $table->decimal('precio_total', 10, 2);
            $table->string('IBAN', 34);
            $table->string('calle_y_n', 255)->nullable();
            $table->string('ciudad', 100)->nullable();
            $table->string('provincia', 100)->nullable();
            $table->string('codigo_postal', 20)->nullable();

            // FK hacia USUARIO
            $table->unsignedInteger('id_usuario')->unique();
            $table->foreign('id_usuario')
                ->references('id_usuario')->on('usuarios')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contratos');
    }
};
