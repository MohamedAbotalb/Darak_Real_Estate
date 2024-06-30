<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['user_id', 'landlord_id', 'tour_id','message', 'type', 'date','status',];
    protected $dates=['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }
    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

}
