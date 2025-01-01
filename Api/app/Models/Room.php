<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

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
        return $this->hasMany(Reservation::class);
    }

    public function roomMaintenance()
    {
        return $this->hasMany(RoomMaintenance::class);
    }

    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }
}
