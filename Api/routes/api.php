<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\RoomMaintenanceController;
use App\Http\Controllers\RoomTypeController;

Route::apiResource('guests', GuestController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('payments', PaymentController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('services-request', ServiceRequestController::class);
Route::apiResource('room-maintenance', RoomMaintenanceController::class);
Route::apiResource('room-types', RoomTypeController::class);
