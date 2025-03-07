<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'room_type_name',
        'description',
        'base_price',
    ];

    public function rooms()
    {
        return $this->hasOne(Room::class);
    }
}
