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
        Schema::create('contrato_servicios', function (Blueprint $table) {
            $table->increments('id_servicio');
            $table->unsignedInteger('id_contrato');

            $table->unsignedInteger('id_fibra')->nullable();
            $table->unsignedInteger('id_tv')->nullable();

            $table->foreign('id_contrato')->references('id_contrato')->on('contratos')->onDelete('cascade');
            $table->foreign('id_fibra')->references('id_fibra')->on('fibra_opciones')->onDelete('set null');
            $table->foreign('id_tv')->references('id_tv')->on('tv_opciones')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrato_servicios');
    }
};
