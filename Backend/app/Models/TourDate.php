<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourDate extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['tour_id', 'date'];
    protected $dates=['deleted_at'];
    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
