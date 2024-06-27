<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['city', 'state','street'];
    protected $dates=['deleted_at'];
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
