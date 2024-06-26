<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyImage extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['property_id', 'image'];
    protected $dates=['deleted_at'];
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
