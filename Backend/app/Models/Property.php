<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
  
    protected $fillable = ['title', 'slug', 'description', 'num_of_rooms', 'num_of_bathrooms', 'area', 'price', 'location_id', 'property_type_id', 'user_id', 'availability', 'listing_type'];
    
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
  
    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }

    public function PropertyImage(){
        return $this->hasMany(PropertyImage::class);
    }
    public function amenities()
    {
        return $this->belongsToMany(Amenity::class);
    }
    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }
}
