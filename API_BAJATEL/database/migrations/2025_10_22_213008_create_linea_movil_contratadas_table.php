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
        Schema::create('lineas_movil_contratadas', function (Blueprint $table) {
            $table->increments('id_linea');

            $table->string('numero', 9)->unique();
            $table->unsignedInteger('id_servicio');
            $table->unsignedInteger('id_movil');

            $table->foreign('id_servicio')->references('id_servicio')->on('contrato_servicios')->onDelete('cascade');
            $table->foreign('id_movil')->references('id_movil')->on('movil_opciones')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lineas_movil_contratadas');
    }
};
