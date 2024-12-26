<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomMaintenance extends Model
{
    use HasFactory;

    protected $primaryKey = 'maintenance_id';

    protected $fillable = [
        'room_id',
        'issue_description',
        'maintenance_status',
        'maintenance_date',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
