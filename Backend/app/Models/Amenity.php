<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Amenity extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['name', 'slug','availability'];

    protected $dates=['deleted_at'];

    public function properties()
    {
        return $this->belongsToMany(Property::class, 'amenity_property');
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
