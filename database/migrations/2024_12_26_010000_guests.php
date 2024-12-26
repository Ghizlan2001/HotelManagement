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
    Schema::create('guests', function (Blueprint $table) {
        $table->id('guest_id');
        $table->string('first_name');
        $table->string('last_name');
        $table->string('phone_number');
        $table->string('email')->unique();
        $table->text('address');
        $table->string('identification_type');
        $table->string('identification_number')->unique();
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