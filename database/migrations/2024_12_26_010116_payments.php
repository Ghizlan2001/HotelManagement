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
    Schema::create('payments', function (Blueprint $table) {
        $table->id('payment_id');
        $table->foreignId('reservation_id')->constrained('reservations')->onDelete('cascade');
        $table->date('payment_date');
        $table->string('payment_method');
        $table->decimal('amount_paid', 10, 2);
        $table->string('payment_status')->default('Successful');
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
