<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $primaryKey = 'guest_id';

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'address',
        'identification_type',
        'identification_number',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'guest_id');
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class, 'guest_id');
    }
}
