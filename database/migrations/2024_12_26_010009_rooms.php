<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('rooms', function (Blueprint $table) {
        $table->id('room_id');
        $table->string('room_number')->unique();
        $table->string('room_type');
        $table->string('room_status')->default('Available');
        $table->decimal('price_per_night', 8, 2);
        $table->integer('max_occupancy');
        $table->text('description')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
