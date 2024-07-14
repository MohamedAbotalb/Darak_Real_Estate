<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyUpdate extends Model
{
    use HasFactory;
    protected $fillable = ['property_id', 'data', 'status'];

    protected $casts = [
        'data' => 'array',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
