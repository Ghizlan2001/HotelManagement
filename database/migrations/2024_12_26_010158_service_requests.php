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
    Schema::create('service_requests', function (Blueprint $table) {
        $table->id('request_id');
        $table->foreignId('guest_id')->constrained('guests')->onDelete('cascade');
        $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
        $table->date('request_date');
        $table->string('status')->default('Pending');
        $table->decimal('total_cost', 10, 2);
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
