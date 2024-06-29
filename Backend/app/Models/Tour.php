<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tour extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['user_id', 'property_id', 'status','tour_id' ];
    protected $dates=['deleted_at'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tourDates()
    {
        return $this->hasMany(TourDate::class);
    }
    public function property()
    {
        return $this->belongsTo(Property::class, 'property_id');
    }
}
