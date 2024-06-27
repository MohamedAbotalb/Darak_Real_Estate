<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyAmenities extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['property_id', 'amenity_id'];
    protected $dates=['deleted_at'];
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
    public function amenity()
    {
        return $this->belongsTo(Amenity::class);
    }

}
