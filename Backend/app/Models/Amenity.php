<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Amenity extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    public function properties()
    {
        return $this->hasMany(Property::class, 'property_amenities');
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($amenity) {
            $amenity->slug = Str::slug($amenity->name);
        });
        static::updating(function ($amenity) {
            $amenity->slug = Str::slug($amenity->name);
        });
    }
}
