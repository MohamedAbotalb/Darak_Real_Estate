<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PropertyType extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($propertyType) {
            $propertyType->slug = Str::slug($propertyType->name);
        });

        static::updating(function ($propertyType) {
            $propertyType->slug = Str::slug($propertyType->name);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}

