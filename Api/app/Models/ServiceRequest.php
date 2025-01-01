<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'guest_id',
        'service_id',
        'request_date',
        'status',
        'total_cost',
    ];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
