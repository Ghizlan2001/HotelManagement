<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $primaryKey = 'room_id';

    protected $fillable = [
        'room_number',
        'room_type',
        'room_status',
        'price_per_night',
        'max_occupancy',
        'description',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'room_id');
    }

    public function roomMaintenance()
    {
        return $this->hasMany(RoomMaintenance::class, 'room_id');
    }
}